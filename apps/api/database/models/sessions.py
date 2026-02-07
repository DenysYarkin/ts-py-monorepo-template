from database.db import Base
from sqlalchemy import String, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column


class Session(Base):
    __tablename__ = "sessions"

    sid: Mapped[str] = mapped_column(String, primary_key=True)
    sess: Mapped[dict] = mapped_column(JSON, nullable=False)
    expire: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=False)
