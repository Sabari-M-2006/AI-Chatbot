import { tool } from 'ai';
import { z } from 'zod';

/**
 * Weather Tool - Get current weather for a city
 * TASK 2: Implement with real API integration
 */
export const getWeatherTool = {
  description: 'Get the current weather for a given city',
  parameters: z.object({
    city: z.string().describe('The city to get weather for'),
    units: z.enum(['celsius', 'fahrenheit']).default('celsius').describe('Temperature units'),
  }),
  execute: async ({ city, units }: { city: string; units: 'celsius' | 'fahrenheit' }) => {
    // Mock data - Replace with real API call (OpenWeatherMap, WeatherAPI, etc.)
    const mockWeather: Record<string, { temp: number; condition: string; humidity: number }> = {
      london: { temp: 12, condition: 'Cloudy', humidity: 75 },
      tokyo: { temp: 22, condition: 'Sunny', humidity: 60 },
      'new york': { temp: 18, condition: 'Partly cloudy', humidity: 65 },
      dubai: { temp: 35, condition: 'Sunny', humidity: 30 },
      sydney: { temp: 25, condition: 'Clear', humidity: 55 },
    };

    const data = mockWeather[city.toLowerCase()] ?? {
      temp: 20,
      condition: 'Unknown',
      humidity: 50,
    };

    const fahrenheit = units === 'fahrenheit' ? (data.temp * 9) / 5 + 32 : data.temp;
    const tempValue = units === 'fahrenheit' ? Math.round(fahrenheit) : data.temp;

    return {
      city: city.charAt(0).toUpperCase() + city.slice(1),
      temperature: tempValue,
      condition: data.condition,
      humidity: data.humidity,
      unit: units === 'fahrenheit' ? '°F' : '°C',
      timestamp: new Date().toISOString(),
    };
  },
};

/**
 * Calculator Tool - Perform mathematical calculations
 * TASK 2: Implement complex expressions
 */
export const getCalculatorTool = {
  description: 'Perform mathematical calculations',
  parameters: z.object({
    expression: z
      .string()
      .describe(
        'Mathematical expression to evaluate (supports +, -, *, /, %, with numbers and parentheses)'
      ),
  }),
  execute: async ({ expression }: { expression: string }) => {
    try {
      // Safe evaluation of mathematical expressions
      const sanitized = expression.replace(/[^0-9+\-*/(). %]/g, '');
      const result = Function('"use strict"; return (' + sanitized + ')')();

      if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
        return {
          error: 'Invalid calculation result',
          expression,
        };
      }

      return {
        expression,
        result: Number.isInteger(result) ? result : parseFloat(result.toFixed(10)),
        success: true,
      };
    } catch (error) {
      return {
        error: 'Invalid mathematical expression',
        expression,
        details: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};

/**
 * Time Zone Tool - Get time information for different zones
 */
export const getTimezoneTool = {
  description: 'Get current time and date information for a specific timezone',
  parameters: z.object({
    timezone: z
      .string()
      .describe(
        'Timezone identifier (e.g., America/New_York, Europe/London, Asia/Tokyo)'
      ),
  }),
  execute: async ({ timezone }: { timezone: string }) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      const parts = formatter.formatToParts(new Date());
      const dateObj: Record<string, string> = {};
      parts.forEach(part => {
        dateObj[part.type] = part.value;
      });

      return {
        timezone,
        dateInfo: dateObj,
        utcOffset: new Date().toLocaleString('en-US', { timeZone: timezone }),
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        error: 'Invalid timezone',
        timezone,
        validExample: 'America/New_York, Europe/London, Asia/Tokyo',
      };
    }
  },
};

/**
 * Text Analysis Tool - Analyze text complexity and statistics
 */
export const getTextAnalysisTool = {
  description: 'Analyze text for word count, reading time, complexity, and statistics',
  parameters: z.object({
    text: z.string().describe('Text to analyze'),
  }),
  execute: async ({ text }: { text: string }) => {
    const words = text.split(/\s+/).filter((w: string) => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter((s: string) => s.trim().length > 0);
    const paragraphs = text.split(/\n\n+/).filter((p: string) => p.trim().length > 0);

    const uniqueWords = new Set(words.map((w: string) => w.toLowerCase()));
    const avgWordLength = words.reduce((sum: number, w: string) => sum + w.length, 0) / words.length;
    const avgWordsPerSentence = words.length / (sentences.length || 1);

    const readingTimeMinutes = Math.ceil(words.length / 200);

    return {
      statistics: {
        wordCount: words.length,
        uniqueWords: uniqueWords.size,
        sentenceCount: sentences.length,
        paragraphCount: paragraphs.length,
        characterCount: text.length,
      },
      averages: {
        wordLength: parseFloat(avgWordLength.toFixed(2)),
        wordsPerSentence: parseFloat(avgWordsPerSentence.toFixed(2)),
      },
      readingTime: {
        minutes: readingTimeMinutes,
        estimatedMinutes: `${readingTimeMinutes} min read`,
      },
      complexity: avgWordLength > 5 && avgWordsPerSentence > 15 ? 'Advanced' : 'Moderate',
    };
  },
};

/**
 * Export all tools for use in the AI model
 * Tools are currently disabled - enable when needed
 */
export const tools = {};
