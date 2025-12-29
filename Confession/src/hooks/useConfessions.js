import { getConfessions, postConfession } from "../api/confessions.api";
import { useConfessionContext } from "../context/ConfessionContext";

export const useConfessions = () => {
  const {
    confessions,
    setConfessions,
    loading,
    setLoading,
    error,
    setError,
  } = useConfessionContext();

  const fetchConfessions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getConfessions();
      setConfessions(data);
    } catch (err) {
      setError(err.message || "Failed to load confessions");
    } finally {
      setLoading(false);
    }
  };

  const submitConfession = async (content) => {
    try {
      setLoading(true);
      setError(null);
      await postConfession(content);
      await fetchConfessions(); // refresh list
    } catch (err) {
      setError(err.message || "Failed to submit confession");
      throw err; // allow UI to react if needed
    } finally {
      setLoading(false);
    }
  };

  return {
    confessions,
    loading,
    error,
    fetchConfessions,
    submitConfession,
  };
};