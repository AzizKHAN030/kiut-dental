import React, { useState } from 'react';
import { Button, Dialog, Grid, Box, Text, Flex } from '@sanity/ui';
import { set, unset } from 'sanity';

// All available country flags with their names
const COUNTRY_FLAGS = [
  { flag: '🇬🇧', name: 'United Kingdom', codes: ['en', 'en-GB'] },
  { flag: '🇺🇸', name: 'United States', codes: ['en-US'] },
  { flag: '🇦🇺', name: 'Australia', codes: ['en-AU'] },
  { flag: '🇨🇦', name: 'Canada', codes: ['en-CA', 'fr-CA'] },
  { flag: '🇷🇺', name: 'Russia', codes: ['ru', 'ru-RU'] },
  { flag: '🇺🇿', name: 'Uzbekistan', codes: ['uz', 'uz-UZ'] },
  { flag: '🇩🇪', name: 'Germany', codes: ['de', 'de-DE'] },
  { flag: '🇦🇹', name: 'Austria', codes: ['de-AT'] },
  { flag: '🇨🇭', name: 'Switzerland', codes: ['de-CH'] },
  { flag: '🇫🇷', name: 'France', codes: ['fr', 'fr-FR'] },
  { flag: '🇪🇸', name: 'Spain', codes: ['es', 'es-ES'] },
  { flag: '🇲🇽', name: 'Mexico', codes: ['es-MX'] },
  { flag: '🇮🇹', name: 'Italy', codes: ['it', 'it-IT'] },
  { flag: '🇵🇹', name: 'Portugal', codes: ['pt', 'pt-PT'] },
  { flag: '🇧🇷', name: 'Brazil', codes: ['pt-BR'] },
  { flag: '🇨🇳', name: 'China', codes: ['zh', 'zh-CN'] },
  { flag: '🇹🇼', name: 'Taiwan', codes: ['zh-TW'] },
  { flag: '🇯🇵', name: 'Japan', codes: ['ja', 'ja-JP'] },
  { flag: '🇰🇷', name: 'South Korea', codes: ['ko', 'ko-KR'] },
  { flag: '🇸🇦', name: 'Saudi Arabia', codes: ['ar', 'ar-SA'] },
  { flag: '🇹🇷', name: 'Turkey', codes: ['tr', 'tr-TR'] },
  { flag: '🇵🇱', name: 'Poland', codes: ['pl', 'pl-PL'] },
  { flag: '🇳🇱', name: 'Netherlands', codes: ['nl', 'nl-NL'] },
  { flag: '🇸🇪', name: 'Sweden', codes: ['sv', 'sv-SE'] },
  { flag: '🇳🇴', name: 'Norway', codes: ['no', 'no-NO'] },
  { flag: '🇩🇰', name: 'Denmark', codes: ['da', 'da-DK'] },
  { flag: '🇫🇮', name: 'Finland', codes: ['fi', 'fi-FI'] },
  { flag: '🇬🇷', name: 'Greece', codes: ['el', 'el-GR'] },
  { flag: '🇨🇿', name: 'Czech Republic', codes: ['cs', 'cs-CZ'] },
  { flag: '🇭🇺', name: 'Hungary', codes: ['hu', 'hu-HU'] },
  { flag: '🇷🇴', name: 'Romania', codes: ['ro', 'ro-RO'] },
  { flag: '🇧🇬', name: 'Bulgaria', codes: ['bg', 'bg-BG'] },
  { flag: '🇭🇷', name: 'Croatia', codes: ['hr', 'hr-HR'] },
  { flag: '🇷🇸', name: 'Serbia', codes: ['sr', 'sr-RS'] },
  { flag: '🇸🇰', name: 'Slovakia', codes: ['sk', 'sk-SK'] },
  { flag: '🇸🇮', name: 'Slovenia', codes: ['sl', 'sl-SI'] },
  { flag: '🇺🇦', name: 'Ukraine', codes: ['uk', 'uk-UA'] },
  { flag: '🇮🇱', name: 'Israel', codes: ['he', 'he-IL'] },
  { flag: '🇹🇭', name: 'Thailand', codes: ['th', 'th-TH'] },
  { flag: '🇻🇳', name: 'Vietnam', codes: ['vi', 'vi-VN'] },
  { flag: '🇮🇩', name: 'Indonesia', codes: ['id', 'id-ID'] },
  { flag: '🇮🇳', name: 'India', codes: ['hi', 'hi-IN'] },
  { flag: '🇦🇪', name: 'UAE', codes: ['ar-AE'] },
  { flag: '🇰🇿', name: 'Kazakhstan', codes: ['kk', 'kk-KZ'] },
  { flag: '🇹🇯', name: 'Tajikistan', codes: ['tg', 'tg-TJ'] },
  { flag: '🇰🇬', name: 'Kyrgyzstan', codes: ['ky', 'ky-KG'] },
  { flag: '🇹🇲', name: 'Turkmenistan', codes: ['tk', 'tk-TM'] },
  { flag: '🇦🇿', name: 'Azerbaijan', codes: ['az', 'az-AZ'] },
  { flag: '🇦🇲', name: 'Armenia', codes: ['hy', 'hy-AM'] },
  { flag: '🇬🇪', name: 'Georgia', codes: ['ka', 'ka-GE'] },
];

// Custom flag picker component
export function FlagPicker(props: any) {
  const { value, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelect = (flag: string) => {
    onChange(set(flag));
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClear = () => {
    onChange(unset());
  };

  const filteredFlags = COUNTRY_FLAGS.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.codes.some((code) => code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Box>
      <Flex gap={2} align="center">
        <Box flex={1}>
          {props.renderDefault({ ...props, readOnly: true })}
        </Box>
        <Button
          text="Choose Flag"
          tone="primary"
          onClick={() => setIsOpen(true)}
          style={{ flexShrink: 0 }}
        />
        {value && (
          <Button
            text="Clear"
            tone="critical"
            mode="ghost"
            onClick={handleClear}
            style={{ flexShrink: 0 }}
          />
        )}
      </Flex>

      {isOpen && (
        <Dialog
          header="Choose a Flag"
          id="flag-picker-dialog"
          onClose={() => {
            setIsOpen(false);
            setSearchQuery('');
          }}
          width={2}
        >
          <Box padding={4}>
            <Box marginBottom={3}>
              <input
                type="text"
                placeholder="Search by country name or locale code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              />
            </Box>
            <Box style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Grid columns={[2, 3, 4]} gap={2}>
                {filteredFlags.map((item, index) => (
                  <Box key={index}>
                    <button
                      type="button"
                      onClick={() => handleSelect(item.flag)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: value === item.flag ? '2px solid #2276fc' : '1px solid #e0e0e0',
                        borderRadius: '8px',
                        background: value === item.flag ? '#f0f7ff' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                      onMouseEnter={(e) => {
                        if (value !== item.flag) {
                          e.currentTarget.style.background = '#f5f5f5';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (value !== item.flag) {
                          e.currentTarget.style.background = 'white';
                        }
                      }}
                    >
                      <Text size={4}>{item.flag}</Text>
                      <Text size={0} style={{ textAlign: 'center', color: '#666' }}>
                        {item.name}
                      </Text>
                    </button>
                  </Box>
                ))}
              </Grid>
            </Box>
            {filteredFlags.length === 0 && (
              <Box padding={4} style={{ textAlign: 'center' }}>
                <Text muted>No flags found matching "{searchQuery}"</Text>
              </Box>
            )}
          </Box>
        </Dialog>
      )}
    </Box>
  );
}

