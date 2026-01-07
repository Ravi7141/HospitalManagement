# React Bit MCP Server

This directory contains the Model Context Protocol (MCP) server for React component management in the Hospital Management System.

## Overview

The React Bit MCP Server provides tools for managing React components, pages, and their dependencies within the Next.js frontend application.

## Installation

Install the required dependencies:

```bash
npm install
```

The MCP SDK will be installed as part of the devDependencies.

## Available Tools

The MCP server provides the following tools:

1. **list_react_components** - List all React components in the components directory
2. **read_component** - Read the contents of a React component file
3. **create_component** - Create a new React component file
4. **update_component** - Update an existing React component
5. **list_pages** - List all pages in the app directory
6. **get_component_dependencies** - Get import dependencies of a component

## Usage

### Running the MCP Server

The MCP server can be run directly:

```bash
npm run mcp:server
```

Or directly with Node:

```bash
node mcp-server.mjs
```

### Integration with MCP Clients

To use this server with an MCP client (like Claude Desktop or Cursor), add the following configuration to your MCP settings:

```json
{
  "mcpServers": {
    "react-bit": {
      "command": "node",
      "args": ["mcp-server.mjs"],
      "cwd": "/path/to/hospitalManagement/frontend"
    }
  }
}
```

### Example Usage

The MCP server communicates via stdio using the Model Context Protocol. Example interactions:

1. **List all components:**
   - Tool: `list_react_components`
   - Returns: Array of component names

2. **Read a component:**
   - Tool: `read_component`
   - Arguments: `{ "componentName": "Header" }`
   - Returns: Component file contents

3. **Create a component:**
   - Tool: `create_component`
   - Arguments: 
     ```json
     {
       "componentName": "NewComponent",
       "content": "export default function NewComponent() { return <div>Hello</div>; }",
       "isClient": true
     }
     ```

4. **Update a component:**
   - Tool: `update_component`
   - Arguments:
     ```json
     {
       "componentName": "ExistingComponent",
       "content": "Updated component content"
     }
     ```

5. **List pages:**
   - Tool: `list_pages`
   - Returns: Array of page routes

6. **Get component dependencies:**
   - Tool: `get_component_dependencies`
   - Arguments: `{ "componentName": "Header" }`
   - Returns: Array of import paths

## Project Structure

```
frontend/
├── mcp-server.mjs    # MCP server implementation
├── mcp-config.json   # MCP server configuration
├── components/       # React components directory
├── app/             # Next.js app directory
└── package.json     # Dependencies and scripts
```

## Notes

- The server uses stdio transport for communication
- All component operations are relative to the `components/` directory
- Page scanning works with Next.js App Router structure
- The server automatically handles both `.jsx` and `.js` file extensions

