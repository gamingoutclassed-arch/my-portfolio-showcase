/**
 * Styled terminal / README block for the bio section.
 */
const TerminalBio = () => {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card font-mono text-sm shadow-[var(--shadow-card)]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/40">
        <span className="w-3 h-3 rounded-full bg-destructive/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-muted-foreground">~/murtaza/README.md</span>
      </div>

      {/* Body */}
      <div className="p-5 leading-relaxed text-foreground/90 space-y-2">
        <div>
          <span className="text-primary"># </span>
          <span className="text-foreground font-semibold">Murtaza Majid</span>
        </div>
        <div className="text-muted-foreground">
          <span className="text-primary">$</span> whoami
        </div>
        <div className="pl-4">
          Data Scientist · BS Data Science · Rawalpindi, PK
        </div>

        <div className="text-muted-foreground mt-3">
          <span className="text-primary">$</span> cat about.txt
        </div>
        <div className="pl-4 text-muted-foreground">
          Dedicated and innovative data scientist with a strong foundation in{" "}
          <span className="text-primary">data analysis</span>,{" "}
          <span className="text-primary">machine learning</span>, and{" "}
          <span className="text-primary">visualization</span>. I uncover meaningful
          insights from complex datasets and ship them as production-ready solutions.
        </div>

        <div className="text-muted-foreground mt-3">
          <span className="text-primary">$</span> ls focus/
        </div>
        <div className="pl-4 grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
          <span>computer-vision/</span>
          <span>nlp/</span>
          <span>deep-learning/</span>
          <span>time-series/</span>
        </div>

        <div className="text-muted-foreground mt-3">
          <span className="text-primary">$</span> echo $STATUS
        </div>
        <div className="pl-4">
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Open to opportunities
          </span>
        </div>
      </div>
    </div>
  );
};

export default TerminalBio;
