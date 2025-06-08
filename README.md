# JamJam - FigJam Project

[![CI](https://github.com/nizos/jamjam/actions/workflows/ci.yml/badge.svg)](https://github.com/nizos/jamjam/actions/workflows/ci.yml)
[![Security](https://github.com/nizos/jamjam/actions/workflows/security.yml/badge.svg)](https://github.com/nizos/jamjam/actions/workflows/security.yml)

A collaborative whiteboarding tool built with Test-Driven Development practices.

## Project Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Claude Code CLI (for AI-assisted development)

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd jamjam

# Install dependencies (once initialized)
npm install
```

### Development Workflow

This project follows strict Test-Driven Development (TDD) practices:

1. Write a failing test first
2. Run the test to ensure it fails for the right reason
3. Implement minimal code to make the test pass
4. Refactor both test and implementation code

### Available Scripts

```bash
npm test              # Run all tests
npm run test:unit     # Run unit tests
npm run test:integration  # Run integration tests
npm run build         # Build the project
npm run lint          # Run linter
npm run format        # Run formatter
npm run typecheck     # Run type checking
```

### Development Practices

See [CLAUDE.md](./CLAUDE.md) for detailed development guidelines and practices.

### Architecture

- **Modular Design**: Code is organized for easy modification and testing
- **Dependency Injection**: Preferred over mocking for testability
- **Clean Architecture**: Following DDD and Clean Code principles where appropriate

### Testing

- Unit tests for business logic
- Integration tests using Playwright-MCP
- All changes introduced through TDD

### Contributing

1. Always start with a failing test
2. Keep commits atomic and frequent
3. Run all checks before committing:
   - Formatting
   - Linting
   - Unit tests
   - Integration tests
