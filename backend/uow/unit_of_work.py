from sqlmodel import Session
from database import engine

def get_uow():
    """
    Patrón Unit of Work: Maneja el ciclo de vida de la transacción.
    Inyecta la sesión, y si algo falla en el medio, deshace los cambios (rollback)
    para proteger la base de datos.
    """
    with Session(engine) as session:
        try:
            yield session
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()