import React, { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Loader, Alert } from './UI';
import { apiService } from '../utils/apiService';
import '../styles/voice-assistant.css';

export const VoiceAssistant = () => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const recognitionRef = useRef(null);

  // Initialize Web Speech API
  const initializeSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = language === 'en' ? 'en-US' : language === 'hi' ? 'hi-IN' : 'pa-IN';
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setError('');
      };

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptSegment = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setTranscript(prev => prev + transcriptSegment);
          } else {
            interimTranscript += transcriptSegment;
          }
        }
      };

      recognitionRef.current.onerror = (event) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setError('Speech Recognition API not supported in your browser');
    }
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      initializeSpeechRecognition();
    }
    setTranscript('');
    setResponse('');
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const processCommand = async () => {
    if (!transcript.trim()) {
      setError('Please say something');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await apiService.processVoiceCommand(transcript, language);
      if (result.success) {
        setResponse(result.data.response);
        speakResponse(result.data.response);
      }
    } catch (err) {
      setError('Failed to process command');
    } finally {
      setLoading(false);
    }
  };

  const speakResponse = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-US' : language === 'hi' ? 'hi-IN' : 'pa-IN';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <button
        className={`voice-assistant-btn ${isDarkMode ? 'dark' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Voice Assistant"
      >
        🎤
      </button>

      {isOpen && (
        <div className={`voice-assistant-panel ${isDarkMode ? 'dark' : ''}`}>
          <div className="panel-header">
            <h3>🎤 Voice Assistant</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="panel-content">
            {error && <Alert type="error" message={error} onClose={() => setError('')} />}

            <div className="transcript-box">
              <p>{transcript || 'Click below to speak...'}</p>
            </div>

            <div className="controls">
              {!isListening ? (
                <button 
                  className="btn-primary"
                  onClick={startListening}
                >
                  🎤 Start Speaking
                </button>
              ) : (
                <button 
                  className="btn-danger"
                  onClick={stopListening}
                >
                  ⏹ Stop
                </button>
              )}
            </div>

            {transcript && (
              <button 
                className="btn-primary"
                onClick={processCommand}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Process Command'}
              </button>
            )}

            {loading && <Loader message="Processing voice command..." />}

            {response && (
              <div className="response-box">
                <h4>Response:</h4>
                <p>{response}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
