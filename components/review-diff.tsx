// An illustrative review: the kind of finding AI PR Reviewer posts on a pull request.
// The code is invented for the example; it is not from any employer's codebase.

type Line = {
  kind: "ctx" | "add" | "del";
  old?: number;
  now?: number;
  code: string;
  flagged?: boolean;
};

const lines: Line[] = [
  { kind: "ctx", old: 41, now: 41, code: "public Settlement settle(CardTxn txn) {" },
  { kind: "del", old: 42, code: '    return gateway.post("/settlements", txn);' },
  { kind: "add", now: 42, code: "    return retry.execute(" },
  { kind: "add", now: 43, code: '        () -> gateway.post("/settlements", txn),', flagged: true },
  { kind: "add", now: 44, code: "        Backoff.exponential(Duration.ofMillis(200), 4));" },
  { kind: "ctx", old: 43, now: 45, code: "}" },
];

const rowTone: Record<Line["kind"], string> = {
  ctx: "",
  add: "bg-add-bg",
  del: "bg-del-bg",
};
const signTone: Record<Line["kind"], string> = {
  ctx: "text-muted",
  add: "text-add-ink",
  del: "text-del-ink",
};
const sign: Record<Line["kind"], string> = { ctx: " ", add: "+", del: "-" };

export default function ReviewDiff() {
  const flaggedIndex = lines.findIndex((l) => l.flagged);

  return (
    <figure className="m-0 min-w-0">
      <div className="overflow-hidden rounded-lg border border-rule bg-surface shadow-[0_1px_0_var(--rule),0_18px_40px_-24px_rgba(20,33,61,0.35)]">
        <div className="flex items-center justify-between gap-4 border-b border-rule px-4 py-2.5 text-sm">
          <span className="truncate font-mono text-[0.8rem] text-ink">
            payments/SettlementClient.java
          </span>
          <span className="shrink-0 font-mono text-[0.8rem]">
            <span className="text-add-ink">+3</span>{" "}
            <span className="text-del-ink">−1</span>
          </span>
        </div>

        <div className="relative overflow-x-auto bg-code-bg font-mono text-[0.78rem] leading-[1.75] sm:text-[0.82rem]">
          <span
            aria-hidden="true"
            className="diff-scan pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-mark"
            style={{ ["--scan-to" as string]: `${lines.length * 1.75}em` }}
          />
          <table className="w-full border-collapse" aria-label="Changed lines">
            <tbody>
              {lines.map((line, i) => (
                <tr key={i} className={rowTone[line.kind]}>
                  <td className="w-9 select-none pr-1 text-right align-top text-muted/70">{line.old ?? ""}</td>
                  <td className="w-9 select-none pr-2 text-right align-top text-muted/70">{line.now ?? ""}</td>
                  <td className={`w-4 select-none align-top ${signTone[line.kind]}`}>{sign[line.kind]}</td>
                  <td className="whitespace-pre pr-4 align-top">
                    <span className={line.flagged ? "diff-flagged" : undefined}>{line.code}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="diff-comment border-t border-rule px-4 py-4 sm:px-5" role="note" aria-label={`Review comment on line ${lines[flaggedIndex].now}`}>
          <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="font-semibold">ai-pr-reviewer</span>
            <span className="rounded border border-rule px-1.5 text-xs text-muted">bot</span>
            <span className="text-muted">commented on line {lines[flaggedIndex].now}</span>
            <span className="ml-auto rounded bg-mark px-1.5 text-xs font-semibold text-mark-ink">High</span>
          </div>
          <p className="m-0 text-[0.95rem] leading-relaxed">
            Retrying this POST can settle the same transaction twice. If the first attempt succeeds
            but times out, the retry charges the card again. Send an idempotency key with every
            attempt, such as <code className="rounded bg-code-bg px-1 font-mono text-[0.85em]">txn.id()</code>,
            so the gateway can drop repeats.
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted">
        An example finding from{" "}
        <a href="#projects" className="marked text-ink">AI PR Reviewer</a>, the GitHub App I
        built with Java and Spring AI.
      </figcaption>
    </figure>
  );
}
