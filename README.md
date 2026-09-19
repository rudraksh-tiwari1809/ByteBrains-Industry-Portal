# ByteBrains — Integrated Industry MVP

This package contains the repaired Industry Portal frontend and the FastAPI backend used by the ByteBrains MVP.

## Run backend

From the `backend` folder:

```bash
pip install -r requirements.txt
python -m uvicorn backend.main:app --reload
```

Backend: http://127.0.0.1:8000  |  Swagger: http://127.0.0.1:8000/docs

## Run Industry frontend

From `frontend/industry`:

```bash
npm install
npm run dev
```

The Vite app uses port 8081 by default. Copy `.env.example` to `.env` if the backend URL needs changing.

## Main integrated flow

Company signup/login → employer dashboard → create/close internships → student applications → required-skill matching → shortlist/offer → analytics.

The backend's `student_skills` model no longer assumes a `score` column. Assessment percentages are read from `assessment_attempts`, matching the existing database design.
