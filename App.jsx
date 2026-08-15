import { useState } from "react";
import "./index.css";

function App() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const search = () => {
    if (!query.trim()) return;

    setLoading(true);
    setAnswer("");

    setTimeout(() => {
      const response = `Here is a concise answer to your question about "${query}".

This Perplexity-style AI Search application combines an intelligent search interface with AI-generated responses. It is designed to help users find information quickly and understand complex topics in a simple way.

The system can be extended with real-time web search APIs and large language models to provide live answers with reliable sources and citations.`;

      setAnswer(response);
      setHistory((old) => [query, ...old.filter((x) => x !== query)].slice(0, 6));
      setLoading(false);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      search();
    }
  };

  return (
    <div className="app">

      <aside className="sidebar">
        <div className="brand">
          <div className="logo">P</div>
          <span>Askly</span>
        </div>

        <button className="new-search" onClick={() => {
          setQuery("");
          setAnswer("");
        }}>
          + New Search
        </button>

        <div className="side-title">Recent searches</div>

        <div className="history">
          {history.length === 0 ? (
            <p className="empty-history">Your searches will appear here.</p>
          ) : (
            history.map((item, index) => (
              <button
                key={index}
                onClick={() => setQuery(item)}
                className="history-item"
              >
                🔎 {item}
              </button>
            ))
          )}
        </div>

        <div className="sidebar-bottom">
          <div>⚙ Settings</div>
          <div>❓ Help</div>
        </div>
      </aside>

      <main className="main">

        <header className="topbar">
          <div className="mobile-brand">Askly</div>
          <div className="mode">✦ AI Search</div>
        </header>

        <section className="content">

          {!answer && !loading && (
            <div className="welcome">
              <div className="big-logo">P</div>

              <h1>What do you want to know?</h1>

              <p>
                Ask anything and get clear, AI-powered answers.
              </p>

              <div className="suggestions">
                <button onClick={() => setQuery("What is artificial intelligence?")}>
                  🤖 What is artificial intelligence?
                </button>

                <button onClick={() => setQuery("How does the internet work?")}>
                  🌐 How does the internet work?
                </button>

                <button onClick={() => setQuery("Best programming languages in 2026")}>
                  💻 Best programming languages in 2026
                </button>

                <button onClick={() => setQuery("Explain quantum computing simply")}>
                  ⚛ Explain quantum computing simply
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <h2>Searching for the best answer...</h2>
              <p>Analyzing your question</p>
            </div>
          )}

          {answer && !loading && (
            <div className="result">

              <div className="question">
                <span>Q</span>
                <h2>{query}</h2>
              </div>

              <div className="answer-card">
                <div className="answer-title">
                  <div className="small-logo">P</div>
                  <strong>Answer</strong>
                </div>

                <p>{answer}</p>
              </div>

              <div className="sources">
                <h3>Sources</h3>

                <div className="source-card">
                  <span>🌐</span>
                  <div>
                    <strong>AI Search Knowledge Base</strong>
                    <p>Relevant information for your query</p>
                  </div>
                </div>

                <div className="source-card">
                  <span>📚</span>
                  <div>
                    <strong>Technology & Research</strong>
                    <p>Background information and references</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          <div className="search-area">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              rows="1"
            />

            <button className="search-button" onClick={search}>
              ↑
            </button>

            <div className="search-tools">
              <span>🌐 Web Search</span>
              <span>✦ AI Answer</span>
              <span>↵ Enter to search</span>
            </div>
          </div>

        </section>

        <footer>
          Askly AI Search • Perplexity-inspired academic project
        </footer>

      </main>
    </div>
  );
}

export default App;