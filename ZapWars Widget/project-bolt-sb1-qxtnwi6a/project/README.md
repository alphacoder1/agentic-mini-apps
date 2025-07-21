# ZapWars Smart Widget

A Bitcoin maximalist meme voting battle widget for YakiHonne/Nostr feeds using Lightning payments.

## 🎮 Features

- **Meme Battle System**: Two Bitcoin memes compete head-to-head
- **Lightning Voting**: Vote with sats using Lightning Network payments
- **Real-time Updates**: Live vote counting and winner determination
- **Smart Widget Integration**: Built for YakiHonne Smart Widget SDK
- **Responsive Design**: Mobile-first, works on all devices
- **Bitcoin Maxi Themed**: Authentic Bitcoin maximalist memes and culture

## ⚡ How It Works

1. Two Bitcoin memes are displayed side by side
2. Users click "Vote ⚡" to support their favorite meme
3. Choose sats amount (10 sats = 1 vote)
4. Lightning payment is processed (currently simulated)
5. Votes are counted and displayed in real-time
6. Losing meme gets replaced with a new challenger

## 🛠️ Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for development and building
- **YakiHonne Smart Widget SDK** integration

## 🚀 Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/zapwars-smart-widget.git
cd zapwars-smart-widget

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
npm run build
```

## 📱 Smart Widget Integration

The widget is designed to integrate with YakiHonne feeds using the Smart Widget SDK:

```javascript
import { registerZapWarsWidget } from './smart-widget-sdk';

// Register the widget
registerZapWarsWidget();

// The widget will be available as 'zapwars' type
smartWidgetHandler.registerRenderer('zapwars', (data, container) => {
  // Widget renders automatically
});
```

## 🔧 Configuration

### Adding Custom Memes

Update the `BITCOIN_MEMES` array in `src/components/ZapWars.tsx`:

```typescript
const BITCOIN_MEMES: Meme[] = [
  {
    id: '1',
    url: '/path/to/your/meme.jpg',
    title: 'Your Meme Title',
    votes: 0
  },
  // Add more memes...
];
```

### Lightning Integration

For production, replace the mock payment function with real Lightning integration:

```typescript
const simulateLightningPayment = async (sats: number): Promise<boolean> => {
  if (window.webln) {
    await window.webln.enable();
    const result = await window.webln.sendPayment(invoice);
    return !!result.preimage;
  }
  return false;
};
```

## 🎯 Roadmap

- [ ] Real Lightning Network integration
- [ ] Backend vote persistence
- [ ] Meme submission system
- [ ] Tournament brackets
- [ ] Leaderboards
- [ ] Social sharing
- [ ] Nostr integration for vote broadcasting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Bitcoin community for the memes
- YakiHonne team for the Smart Widget SDK
- Lightning Network developers
- React and Vite teams

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**⚡ Zap responsibly! ⚡**