from __future__ import annotations

from typing import Any


def score_activity(activity: Any, *, grade: int, equipment: list[str], ground_size: str, duration: int, intensity: str, accessibility: str) -> tuple[float, dict[str, float]]:
    grade_match = 1.0 if str(grade) in activity.grade_range or "1-10" in activity.grade_range else 0.65
    equipment_match = 1.0 if not equipment else 0.8
    if activity.equipment.lower() == "none":
        equipment_match = 1.0
    else:
        equipment_match = 0.9 if any(item.lower() in activity.equipment.lower() for item in equipment) else 0.5
    space_match = {"Small": 0.9, "Medium": 1.0, "Large": 1.0}.get(ground_size, 1.0)
    duration_match = 1.0 if activity.duration <= duration else max(0.5, duration / activity.duration)
    intensity_match = {"Low": 0.9, "Moderate": 1.0, "High": 0.8}.get(intensity, 1.0)
    access_match = 1.0 if "mobility" in accessibility.lower() or "confidence" in accessibility.lower() else 0.9
    participation = 0.7 + (activity.group_size or 4) / 20
    safety = 0.95 if activity.safety_instructions else 0.7

    weights = {
        "participation": 0.30,
        "equipment": 0.15,
        "grade": 0.15,
        "space": 0.10,
        "group": 0.10,
        "accessibility": 0.10,
        "setup": 0.05,
        "safety": 0.05,
    }

    score = (
        participation * weights["participation"]
        + equipment_match * weights["equipment"]
        + grade_match * weights["grade"]
        + space_match * weights["space"]
        + (1.0 if (activity.group_size or 6) <= 8 else 0.8) * weights["group"]
        + access_match * weights["accessibility"]
        + 0.9 * weights["setup"]
        + safety * weights["safety"]
        + duration_match * 0.1
    )

    metrics = {
        "Participation potential": round(participation * 100, 1),
        "Equipment compatibility": round(equipment_match * 100, 1),
        "Grade suitability": round(grade_match * 100, 1),
        "Space compatibility": round(space_match * 100, 1),
        "Group suitability": round((1.0 if (activity.group_size or 6) <= 8 else 0.8) * 100, 1),
        "Accessibility": round(access_match * 100, 1),
        "Setup simplicity": 90.0,
        "Safety": round(safety * 100, 1),
    }
    return round(score * 100, 2), metrics


def build_rotation_schedule(student_count: int, activity_names: list[str]) -> list[dict[str, str | int]]:
    groups = [f"Group {chr(65 + i)}" for i in range((student_count + 5) // 6)]
    zones = [f"Zone {i + 1}" for i in range(min(len(activity_names), 5))]
    schedule: list[dict[str, str | int]] = []
    for round_number in range(1, len(groups) + 1):
        for idx, group in enumerate(groups):
            zone = zones[(idx + round_number) % len(zones)]
            schedule.append({
                "round": round_number,
                "group": group,
                "zone": zone,
                "activity": activity_names[(idx + round_number) % len(activity_names)],
            })
    return schedule
