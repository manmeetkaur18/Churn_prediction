from fastapi import FastAPI, HTTPException
from pathlib import Path
import joblib
import pandas as pd
import logging
from .schemas import ChurnInput
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Basic logging setup
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# Resolve project root safely
BASE_DIR = Path(__file__).resolve().parent.parent
model_path = BASE_DIR / "model" / "churn_model.pkl"

model = joblib.load(model_path)

@app.get("/")
def home():
    return {"message": "Churn Prediction API Running"}

@app.post("/predict")
def predict(data: ChurnInput):
    try:
        # Convert input to DataFrame
        df = pd.DataFrame([data.dict()])

        # Make prediction
        prediction = model.predict(df)[0]
        probability = model.predict_proba(df)[0][1]

        # Extract feature importance (RandomForest only)
        importances = model.named_steps["classifier"].feature_importances_
        feature_names = model.named_steps["preprocessor"].get_feature_names_out()

        # Combine and sort top 8
        feature_data = sorted(
            zip(feature_names, importances),
            key=lambda x: x[1],
            reverse=True
        )[:8]

        # Clean feature names
        cleaned_features = []
        for f, i in feature_data:
            name = f.split("__")[-1]  # remove pipeline prefixes
            name = name.replace("_", " ")  # clean underscores

            cleaned_features.append({
                "feature": name,
                "importance": float(i)
            })

        logging.info(
            f"Prediction made | churn={prediction} | prob={probability:.4f}"
        )

        annual_revenue = data.MonthlyCharges * 12
        revenue_at_risk = annual_revenue * probability

        return {
        "churn_prediction": int(prediction),
        "churn_probability": float(probability),
        "annual_revenue": float(annual_revenue),
        "revenue_at_risk": float(revenue_at_risk),
        "top_features": cleaned_features
    }

    except Exception as e:
        logging.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail="Prediction failed")