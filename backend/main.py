from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from contextlib import asynccontextmanager
from database import create_db_and_tables
from routers import productos, categorias, ingredientes

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)

# --- CONFIGURACIÓN CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite que React (o cualquiera) se conecte
    allow_credentials=True,
    allow_methods=["*"],  # Permite GET, POST, PUT, DELETE
    allow_headers=["*"],
)
# --------------------------

app.include_router(productos.router)
app.include_router(categorias.router)
app.include_router(ingredientes.router)

@app.get("/")
def read_root():
    return {"mensaje": "API funcionando correctamente"}