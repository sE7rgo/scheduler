import react, {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (next, replace) {
    if (!replace) {
      setHistory([...history, next]);
    }
    return setMode(next)
  }

  function back () {
    if (history.length > 1) {
      let newHistory = history.slice(0, -1);
      setHistory(newHistory);
      return setMode(newHistory[newHistory.length - 1]);
    }
  }

  return { mode, transition, back };
}