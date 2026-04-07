from fastapi import FastAPI
from app.db.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import auth_routes, user_routes, record_routes, dashboard_routes

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(user_routes.router)
app.include_router(record_routes.router)
app.include_router(dashboard_routes.router)


@app.get("/")
def root():
    return {"message": "API is running"}