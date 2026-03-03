# Customer Churn Prediction System

An end-to-end machine learning system that predicts customer churn using the IBM Telco Customer Churn dataset.  
The system identifies high-risk customers and estimates potential revenue loss, enabling data-driven retention strategies.

---

## 🚀 Project Overview

Customer churn directly impacts revenue and growth.  
This project builds a full-stack churn prediction solution that:

- Predicts churn probability for individual customers
- Identifies key churn-driving factors
- Estimates annual revenue at risk
- Exposes the model through a REST API
- Provides an interactive frontend interface

---

## 📊 Dataset

**IBM Telco Customer Churn Dataset**

- ~7,043 customer records
- 21 features
- Target variable: `Churn` (Yes/No)
- Churn rate: ~26%

### Feature Categories

- **Demographic:** gender, SeniorCitizen
- **Account Information:** tenure, Contract
- **Services:** InternetService, TechSupport, StreamingTV
- **Billing:** MonthlyCharges, PaymentMethod

---

## 🧠 Machine Learning Workflow

1. Data cleaning and preprocessing
2. Handling missing values
3. Encoding categorical features (OneHotEncoder)
4. Scaling numerical features (StandardScaler)
5. Train-test split (80/20, stratified)
6. Model training using Random Forest
7. Model evaluation using Accuracy and ROC-AUC
8. Model serialization using joblib
9. Deployment via FastAPI

---

## 📈 Model Performance

- **Train Accuracy:** ~83%
- **Test Accuracy:** ~79%
- **ROC-AUC Score:** ~0.83

The ROC-AUC score indicates strong ability to distinguish between churners and non-churners.

---

## 🔍 Key Churn Drivers

Top contributing factors identified by the model:

- Short tenure
- Month-to-month contracts
- Fiber optic internet service
- Electronic check payment method
- Higher monthly charges

These insights align with real-world telecom churn patterns.

---

## 💰 Revenue at Risk Estimation

The system estimates potential annual revenue loss using:

Annual Revenue = MonthlyCharges × 12  
Revenue at Risk = Annual Revenue × Churn Probability  

This provides actionable business insight beyond classification.

---

## 🏗️ System Architecture

Frontend (React)  
⬇  
FastAPI Backend  
⬇  
Trained ML Model (Scikit-learn Pipeline)

---

## 🛠️ Tech Stack

- Python
- Scikit-learn
- Pandas / NumPy
- FastAPI
- React
- Joblib

---

## 📦 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2️⃣ Create Virtual Environment
python -m venv venv
venv\Scripts\activate   # Windows

3️⃣ Install Dependencies
pip install -r requirements.txt

4️⃣ Run Backend
python -m uvicorn app.main:app --reload

API available at:

http://localhost:8000/docs

📌 Example API Request
{
  "gender": "Female",
  "SeniorCitizen": 0,
  "Partner": "Yes",
  "Dependents": "No",
  "tenure": 5,
  "PhoneService": "Yes",
  "MultipleLines": "No",
  "InternetService": "Fiber optic",
  "OnlineSecurity": "No",
  "OnlineBackup": "No",
  "DeviceProtection": "No",
  "TechSupport": "No",
  "StreamingTV": "Yes",
  "StreamingMovies": "Yes",
  "Contract": "Month-to-month",
  "PaperlessBilling": "Yes",
  "PaymentMethod": "Electronic check",
  "MonthlyCharges": 89.1,
  "TotalCharges": 445.5
}
