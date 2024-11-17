import { Download } from 'lucide-react';
import { useStore } from '../store';

export default function ExportButton() {
  const { targetDate, customText, textColor, theme, textStyle } = useStore();

  const getBackgroundCSS = () => {
    const themeBackgrounds = {
      'bg-gradient-to-br from-blue-900 via-black to-purple-900':
        'linear-gradient(135deg, #1e3a8a, #000000, #581c87)',
      'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500':
        'linear-gradient(135deg, #ec4899, #ef4444, #eab308)',
      'bg-gradient-to-br from-gray-900 to-gray-800':
        'linear-gradient(135deg, #111827, #1f2937)',
      'bg-gradient-to-br from-green-800 via-green-900 to-black':
        'linear-gradient(135deg, #166534, #14532d, #000000)',
      'bg-gradient-to-br from-blue-800 via-blue-900 to-black':
        'linear-gradient(135deg, #1e40af, #1e3a8a, #000000)',
      'bg-gradient-to-br from-orange-500 via-red-500 to-pink-500':
        'linear-gradient(135deg, #f97316, #ef4444, #ec4899)',
      'bg-gradient-to-br from-purple-900 via-violet-900 to-black':
        'linear-gradient(135deg, #581c87, #4c1d95, #000000)',
      'bg-gradient-to-br from-green-400 via-cyan-900 to-blue-900':
        'linear-gradient(135deg, #4ade80, #164e63, #1e3a8a)',
      'bg-gradient-to-br from-pink-700 via-purple-800 to-indigo-900':
        'linear-gradient(135deg, #be185d, #6b21a8, #312e81)',
    };
    return themeBackgrounds[theme] || 'linear-gradient(135deg, #1e3a8a, #000000, #581c87)';
  };

  const sanitizeInput = (input) => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  };

  const handleExport = () => {
    const sanitizedCustomText = customText ? sanitizeInput(customText) : '';
    const backgroundCSS = getBackgroundCSS();
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Countdown Timer</title>
    <style>
      /* Global Styles */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        background: ${backgroundCSS};
        background-size: 400% 400%;
        animation: backgroundShift 15s ease infinite;
        color: ${textColor};
        font-family: ui-sans-serif, system-ui, sans-serif;
        overflow: hidden;
      }

      /* Background Animation */
      @keyframes backgroundShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      /* Floating Container Animation */
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }

      /* Text Animations */
      @keyframes neon {
        0%, 100% { 
          filter: brightness(100%) blur(0.5px);
          text-shadow: 0 0 10px ${textColor}80,
                       0 0 20px ${textColor}80,
                       0 0 30px ${textColor}80,
                       0 0 40px ${textColor}40;
        }
        50% { 
          filter: brightness(130%) blur(1px);
          text-shadow: 0 0 20px ${textColor}80,
                       0 0 30px ${textColor}80,
                       0 0 40px ${textColor}80,
                       0 0 50px ${textColor}40;
        }
      }

      @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
      }

      @keyframes hologram {
        0%, 100% { 
          opacity: 0.8;
          filter: brightness(100%) blur(0.5px);
        }
        50% { 
          opacity: 1;
          filter: brightness(120%) blur(1px);
        }
      }

      /* Particle Animation */
      @keyframes particleFloat {
        0% { transform: translateY(0) rotate(0deg); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
      }

      #particles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      }

      .particle {
        position: absolute;
        bottom: 0;
        width: 3px;
        height: 3px;
        background: ${textColor};
        border-radius: 50%;
        animation: particleFloat linear infinite;
      }

      .container {
        position: relative;
        z-index: 2;
        padding: 2rem;
        text-align: center;
        animation: float 3s ease-in-out infinite;
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .countdown-text {
        font-size: clamp(3rem, 10vw, 8rem);
        font-weight: bold;
        line-height: 1.2;
        animation: ${
          textStyle === 'neon'
            ? 'neon 1.5s infinite alternate'
            : textStyle === 'glitch'
            ? 'glitch 500ms infinite'
            : textStyle === 'hologram'
            ? 'hologram 2s infinite'
            : 'none'
        };
        ${
          textStyle === 'outline'
            ? `-webkit-text-stroke: 2px ${textColor}; color: transparent;`
            : ''
        }
        ${
          textStyle === 'shadow'
            ? `text-shadow: 2px 2px 8px ${textColor}80;`
            : ''
        }
        white-space: pre-line;
      }

      .custom-text {
        font-size: clamp(1.5rem, 5vw, 3rem);
        margin-bottom: 1rem;
        opacity: 0.9;
        white-space: pre-line;
      }
    </style>
</head>
<body>
    <div id="particles"></div>
    <div class="container">
        ${
          sanitizedCustomText
            ? `<div class="custom-text">${sanitizedCustomText}</div>`
            : ''
        }
        <div id="countdown" class="countdown-text"></div>
    </div>

    <script>
        // Create particles
        const particlesContainer = document.getElementById('particles');
        const particleCount = 100;

        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = \`\${Math.random() * 100}%\`;
          particle.style.animationDuration = \`\${5 + Math.random() * 5}s\`;
          particle.style.animationDelay = \`\${Math.random() * 5}s\`;
          particle.style.opacity = \`\${0.3 + Math.random() * 0.7}\`;
          particlesContainer.appendChild(particle);
        }

        // Update countdown
        function updateCountdown() {
          const targetDate = new Date('${targetDate.toISOString()}');
          const now = new Date();
          const distance = targetDate - now;

          if (distance < 0) {
            document.getElementById('countdown').innerHTML = 'TIME IS UP!';
            return;
          }

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          let timeString = '';
          if (days > 0) {
            timeString = \`\${days}D \${hours}H\\n\${minutes}M \${seconds}S\`;
          } else if (hours > 0) {
            timeString = \`\${hours}H \${minutes}M\\n\${seconds}S\`;
          } else {
            timeString = \`\${minutes}:\${seconds
              .toString()
              .padStart(2, '0')}\`;
          }

          document.getElementById('countdown').innerHTML = timeString;
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();
    </script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'countdown.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg 
                   flex items-center gap-2 shadow-lg transition-colors"
    >
      <Download size={20} />
      Export HTML
    </button>
  );
}
