import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SlideRenderer from "../components/SlideRenderer";

interface TalkViewerState {
  slides: string[];
  currentSlide: number;
  loading: boolean;
  error: string | null;
}

function TalkViewer() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [state, setState] = useState<TalkViewerState>({
    slides: [],
    currentSlide: 0,
    loading: true,
    error: null,
  });

  // Parse slides from markdown content
  const parseSlides = (markdown: string): string[] => {
    // Split by --- with optional surrounding whitespace/newlines
    // This regex handles: \n---\n, \n\n---\n\n, etc.
    const slides = markdown
      .split(/\n\s*---\s*\n/)
      .map(slide => slide.trim())
      .filter(slide => slide.length > 0);

    return slides.length > 0 ? slides : ["No content found"];
  };

  // Load talk markdown file
  useEffect(() => {
    if (!slug) {
      setState(prev => ({ ...prev, error: "No slug provided", loading: false }));
      return;
    }

    const loadTalk = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));

        const response = await fetch(`/talks/${slug}.md`);

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? `Talk "${slug}" not found`
              : `Failed to load talk (${response.status})`
          );
        }

        const markdown = await response.text();
        const slides = parseSlides(markdown);

        // Check if there's a hash in URL for initial slide
        const hash = window.location.hash.replace("#", "");
        const initialSlide = hash ? parseInt(hash, 10) - 1 : 0;
        const validSlide = Math.max(0, Math.min(initialSlide, slides.length - 1));

        setState({
          slides,
          currentSlide: validSlide,
          loading: false,
          error: null,
        });
      } catch (err) {
        setState({
          slides: [],
          currentSlide: 0,
          loading: false,
          error: err instanceof Error ? err.message : "Unknown error occurred",
        });
      }
    };

    loadTalk();
  }, [slug]);

  // Update URL hash when slide changes
  useEffect(() => {
    if (state.slides.length > 0) {
      window.location.hash = `${state.currentSlide + 1}`;
    }
  }, [state.currentSlide, state.slides.length]);

  // Navigation functions
  const goToSlide = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      currentSlide: Math.max(0, Math.min(index, prev.slides.length - 1)),
    }));
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide(state.currentSlide + 1);
  }, [state.currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(state.currentSlide - 1);
  }, [state.currentSlide, goToSlide]);

  const firstSlide = useCallback(() => {
    goToSlide(0);
  }, [goToSlide]);

  const lastSlide = useCallback(() => {
    goToSlide(state.slides.length - 1);
  }, [state.slides.length, goToSlide]);

  const exitPresentation = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default for navigation keys to avoid page scrolling
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " ", "Home", "End", "Escape"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case " ": // Space
          nextSlide();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          prevSlide();
          break;
        case "Home":
          firstSlide();
          break;
        case "End":
          lastSlide();
          break;
        case "Escape":
          exitPresentation();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, firstSlide, lastSlide, exitPresentation]);

  // Loading state
  if (state.loading) {
    return (
      <div className="talk-viewer">
        <div className="slide-content">
          <p className="loading-message">Loading talk...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.error) {
    return (
      <div className="talk-viewer">
        <div className="slide-content error">
          <h2>Error</h2>
          <p>{state.error}</p>
          <button onClick={exitPresentation} className="back-button">
            ← Back to home
          </button>
        </div>
      </div>
    );
  }

  const { slides, currentSlide } = state;
  const totalSlides = slides.length;

  return (
    <div className="talk-viewer">
      <div className="slide-content">
        <SlideRenderer content={slides[currentSlide]} />
      </div>

      <div className="slide-controls">
        <div className="slide-counter">
          {currentSlide + 1} / {totalSlides}
        </div>
        <div className="slide-progress">
          <div
            className="slide-progress-bar"
            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          />
        </div>
        <div className="slide-hints">
          <span className="hint">← → Navigate</span>
          <span className="hint">ESC Exit</span>
        </div>
      </div>
    </div>
  );
}

export default TalkViewer;
