'use client';

import { useState, useEffect } from 'react';

interface Props {
  consequence: string;
}

export default function ConsequenceReveal({ consequence }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`bg-amber-50 border-2 border-amber-200 rounded-xl p-6 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className='flex items-start gap-3'>
        <span className='text-3xl'>⚡</span>
        <div className='flex-1'>
          <h4 className='font-semibold text-amber-900 mb-2'>
            Consequence Revealed
          </h4>
          <p className='text-slate-700 leading-relaxed'>{consequence}</p>
        </div>
      </div>
    </div>
  );
}
