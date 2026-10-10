from __future__ import annotations

import json
from typing import Any

from sqlalchemy.orm import Session

from app.models import Activity, Session, SessionGroup, SessionRotation


def generate_groups(student_count: int, grade: int) -> list[dict[str, Any]]:
    group_count = max(3, min(8, round(student_count / 6)))
    group_size = student_count // group_count
    remainder = student_count % group_count
    groups = []
    for i in range(group_count):
        size = group_size + (1 if i < remainder else 0)
        groups.append({
            "name": f"Group {chr(65 + i)}",
            "students": [f"Student {j + 1}" for j in range(size)],
            "size": size,
            "grade": grade,
        })
    return groups


def generate_session_content(db: Session, session: Session, activities: list[Activity]) -> dict[str, Any]:
    selected = sorted(
        activities,
        key=lambda a: (
            - (a.group_size or 6),
            a.intensity.lower() != "moderate",
            a.name,
        ),
    )[:6]

    groups = generate_groups(session.student_count, session.grade)
    session_groups = [SessionGroup(session_id=session.id, name=g["name"], members=json.dumps(g["students"])) for g in groups]
    db.add_all(session_groups)

    rotations: list[SessionRotation] = []
    for round_number in range(1, 4):
        for idx, group in enumerate(groups):
            activity = selected[(idx + round_number) % len(selected)]
            rotations.append(
                SessionRotation(
                    session_id=session.id,
                    round_number=round_number,
                    group_name=group["name"],
                    zone_name=f"Zone {idx + 1}",
                    zone_activity=activity.name,
                    duration=5,
                    instructions=activity.instructions[:300],
                )
            )
    db.add_all(rotations)
    db.commit()

    session.generated_summary = "Warm-up, zone rotations, inclusive adaptations, and cool-down planned."
    session.participation_target = max(20, int(session.student_count * 0.85))
    db.commit()

    return {
        "warm_up": "Dynamic mobility and coordination game",
        "zones": [
            {
                "name": zone.name,
                "activity": zone.name,
                "group": group["name"],
                "duration": 8,
                "equipment": zone.equipment,
                "instructions": zone.instructions[:200],
                "difficulty": zone.difficulty,
                "adaptation": zone.accessibility_adaptations[:200],
                "safety": zone.safety_instructions[:200],
            }
            for zone, group in zip(selected, groups)
        ],
        "groups": groups,
        "rotation_schedule": [
            {"round": r.round_number, "group": r.group_name, "zone": r.zone_name, "activity": r.zone_activity}
            for r in rotations
        ],
        "participation_target": session.participation_target,
    }
