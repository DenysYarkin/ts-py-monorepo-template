from fastapi import FastAPI
from routers import auth, user
from schemas.generated import HealthCheckResponse

app = FastAPI(title="My Project API")

app.include_router(auth.router)
app.include_router(user.router)


@app.get("/", response_model=HealthCheckResponse)
def health_check() -> HealthCheckResponse:
    return HealthCheckResponse(status="ok", message="Go to /docs to test login")
