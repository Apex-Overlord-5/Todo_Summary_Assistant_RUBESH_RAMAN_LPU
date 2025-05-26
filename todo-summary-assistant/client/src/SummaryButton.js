import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

function SummaryButton({ onClick }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="summary-btn-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <motion.button
        onClick={handleClick}
        disabled={loading}
        whileHover={!loading ? { scale: 1.05 } : {}}
        whileTap={!loading ? { scale: 0.95 } : {}}
        className={`summary-button ${loading ? 'disabled' : ''}`}
      >
        <Sparkles size={18} className={loading ? 'animate-spin' : ''} />
        {loading ? 'Summarizing...' : 'Summarize & Send to Slack'}
      </motion.button>
    </motion.div>
  );
}

export default SummaryButton;