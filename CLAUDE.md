# Claude Code Project Guidelines

## Project Overview
This is a FigJam project that will be developed with Claude Code assistance using Test-Driven Development.

## Development Practices

### Test-Driven Development (TDD)
- **Always** test-drive changes starting with a test that fails for the right reason
- Run the test to ensure it fails before implementing
- Implement the minimum code necessary to make the test pass
- Once the test passes, refactor both test and implementation code
- Introduce changes only using TDD

### Testing Strategy
- Write meaningful tests using dependency injection over mocking
- Use Playwright-MCP for integration tests
- Ensure tests are descriptive and test behavior, not implementation
- Keep tests focused and independent

### Implementation Approach
- Plan implementation by value
- Start simple and build on functionality as needed
- Avoid over-engineering and complexity
- Keep code modular and easy to modify, test, and work with

### Software Engineering Principles
- Apply Domain-Driven Design (DDD) where appropriate
- Follow Clean Code principles
- Implement Continuous Integration practices
- Regularly refactor to improve code quality
- Look for refactoring opportunities in existing code

### Pre-commit Checklist
- Run formatting
- Run linting
- Run unit tests
- Run integration tests
- Ensure all tests pass
- Commit frequently with atomic, logical changes

### Code Style
- Use TypeScript for type safety
- Follow consistent naming conventions (camelCase for variables/functions, PascalCase for components/classes)
- Keep functions small and focused
- Use meaningful variable and function names

### File Organization
- `/src` - Source code
- `/tests` - Test files (unit and integration)
- `/docs` - Documentation
- `/dist` - Build output (ignored)
- `/node_modules` - Dependencies (ignored)

### Commands
- `npm test` - Run all tests in watch mode
- `npm run test:unit` - Run unit tests once
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:integration` - Run integration tests with Playwright
- `npm run build` - Build the project
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run typecheck` - Run TypeScript type checking
- `npm run pre-commit` - Run all checks (format, lint, typecheck, unit tests)

### Dependencies
- Minimize external dependencies
- Document why each dependency is needed
- Keep dependencies up to date
- Prefer dependency injection for testability

### Documentation
- Keep README.md updated with setup instructions
- Document complex business logic
- Update this file as practices evolve

## Project-Specific Notes
- FigJam is a collaborative whiteboarding tool
- Focus on user experience and performance
- Ensure accessibility compliance
- Build incrementally based on user value

## Project Documentation
- Architecture: See `/docs/architecture.md` for system design
- Tasks: See `/tasks/todo.md` for implementation tasks
- Follow the architecture patterns and interfaces defined in these documents