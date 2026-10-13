// Inline SVG icon set, ported 1:1 from the design prototype.
export default function Icon({ name, size = 20, style }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', style };
  switch (name) {
    case 'dashboard': return (<svg {...common}><rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/></svg>);
    case 'box': return (<svg {...common}><path d="M3 7.5 12 3l9 4.5v9L12 21 3 16.5z"/><path d="M3 7.5 12 12l9-4.5"/><path d="M12 12v9"/></svg>);
    case 'swap': return (<svg {...common}><path d="M7 7h13"/><path d="M16 3l4 4-4 4"/><path d="M17 17H4"/><path d="M8 21l-4-4 4-4"/></svg>);
    case 'alert': return (<svg {...common}><path d="M12 3 2.6 20h18.8z"/><path d="M12 9.5v5"/><path d="M12 17.6h.01"/></svg>);
    case 'truck': return (<svg {...common}><rect x="1.5" y="6" width="13" height="10" rx="1.4"/><path d="M14.5 9h4l3 3v4h-7z"/><circle cx="6" cy="18.5" r="1.9"/><circle cx="18" cy="18.5" r="1.9"/></svg>);
    case 'clipboard': return (<svg {...common}><rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2.5" width="6" height="3.6" rx="1"/><path d="M9 11h6"/><path d="M9 15h6"/></svg>);
    case 'chart': return (<svg {...common}><path d="M4 20V4"/><path d="M4 20h16"/><rect x="7" y="12" width="3" height="5"/><rect x="12" y="8" width="3" height="9"/><rect x="17" y="14" width="3" height="3"/></svg>);
    case 'search': return (<svg {...common}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>);
    case 'bell': return (<svg {...common}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10.5 19a1.6 1.6 0 0 0 3 0"/></svg>);
    case 'plus': return (<svg {...common}><path d="M12 5v14"/><path d="M5 12h14"/></svg>);
    case 'arrowUp': return (<svg {...common}><path d="M12 19V5"/><path d="M6 11l6-6 6 6"/></svg>);
    case 'arrowDown': return (<svg {...common}><path d="M12 5v14"/><path d="M6 13l6 6 6-6"/></svg>);
    case 'arrowRight': return (<svg {...common}><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>);
    case 'chevron': return (<svg {...common}><path d="M9 6l6 6-6 6"/></svg>);
    case 'back': return (<svg {...common}><path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/></svg>);
    case 'menu': return (<svg {...common}><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>);
    case 'check': return (<svg {...common}><path d="M5 12l5 5 9-11"/></svg>);
    case 'dollar': return (<svg {...common}><path d="M12 3v18"/><path d="M16.5 7.5C16.5 5.7 14.5 4.5 12 4.5S7.5 5.7 7.5 7.5 9.5 10.5 12 11s4.5 1.5 4.5 3.5S14.5 18 12 18s-4.5-1.2-4.5-3"/></svg>);
    case 'download': return (<svg {...common}><path d="M12 3v12"/><path d="M7 11l5 5 5-5"/><path d="M4 20h16"/></svg>);
    case 'clock': return (<svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>);
    default: return null;
  }
}
