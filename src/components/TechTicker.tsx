const TECH = [
  "YOLOv11", "PyTorch", "TensorFlow", "FastAPI", "OpenCV", "LSTM",
  "Streamlit", "Scikit-Learn", "Pandas", "NumPy", "XGBoost", "ARIMA",
  "MediaPipe", "Hugging Face", "PostgreSQL", "Next.js", "Supabase", "Power BI",
];

const TechTicker = () => {
  const items = [...TECH, ...TECH];
  return (
    <div className="relative w-full overflow-hidden border-y border-border bg-card/40 py-4">
      <div className="flex gap-10 whitespace-nowrap animate-[ticker_40s_linear_infinite]">
        {items.map((t, i) => (
          <span
            key={i}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechTicker;
