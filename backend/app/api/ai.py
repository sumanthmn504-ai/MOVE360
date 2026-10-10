from __future__ import annotations

import logging
from typing import Any

from fastapi import APIRouter, HTTPException, status

from app.schemas import AIRequest, AIResponse

logger = logging.getLogger("move360.ai")
router = APIRouter(prefix="/api/v1", tags=["ai"])


@router.post("/ai/chat", response_model=AIResponse)
def ai_chat(payload: AIRequest):
    message = payload.message.strip()
    if not message:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Please provide a message")

    logger.info("AI request received: %s", message)
    lowered = message.lower()

    if "small ground" in lowered or "only 4 balls" in lowered or "30-minute" in lowered:
        reply = "Use a 3-zone rotation with a low-prep locomotor warm-up, one target station, and one fitness station. Keep the route short, reduce waiting by using 4-6 students per group, and use walking variations when needed."
        return AIResponse(reply=reply, fallback=True)

    if "lower intensity" in lowered or "moderate" in lowered:
        reply = "Lower the intensity by increasing recovery time, choosing walking or stepping options, and shortening task distances while preserving the same group structure."
        return AIResponse(reply=reply, fallback=True)

    if "accessibility" in lowered or "adapt" in lowered:
        reply = "Use the same activity with a larger target, longer recovery time, shorter distance, seated version, or partner support, while keeping the objective unchanged. Teacher judgment and school safety procedures remain essential."
        return AIResponse(reply=reply, fallback=True)

    reply = "MOVE360 is designed to help teachers reduce waiting time by using multiple simultaneous zones, balanced groups, and inclusive adaptations. A safe practical next step is to reduce setup complexity, keep groups to 4-6 students, and rotate every 5-8 minutes."
    return AIResponse(reply=reply, fallback=True)
