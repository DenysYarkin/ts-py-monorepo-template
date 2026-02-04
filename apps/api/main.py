from fastapi import FastAPI
from routers import auth, user

# Initialize App
app = FastAPI(title="My Project API")

# Include Routers
app.include_router(auth.router)
app.include_router(user.router)


@app.get("/")
def health_check():
    return {"status": "ok", "message": "Go to /docs to test login"}
