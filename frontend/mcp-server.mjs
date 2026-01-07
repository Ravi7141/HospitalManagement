#!/usr/bin/env node

/**
 * React Bit MCP Server
 * Model Context Protocol server for React component management
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ReactBitMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'react-bit-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
    this.componentsPath = path.join(__dirname, 'components');
    this.appPath = path.join(__dirname, 'app');
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'list_react_components',
          description: 'List all React components in the components directory',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'read_component',
          description: 'Read the contents of a React component file',
          inputSchema: {
            type: 'object',
            properties: {
              componentName: {
                type: 'string',
                description: 'Name of the component file (without .jsx extension)',
              },
            },
            required: ['componentName'],
          },
        },
        {
          name: 'create_component',
          description: 'Create a new React component file',
          inputSchema: {
            type: 'object',
            properties: {
              componentName: {
                type: 'string',
                description: 'Name of the new component (PascalCase)',
              },
              content: {
                type: 'string',
                description: 'JSX content of the component',
              },
              isClient: {
                type: 'boolean',
                description: 'Whether to add "use client" directive',
                default: false,
              },
            },
            required: ['componentName', 'content'],
          },
        },
        {
          name: 'update_component',
          description: 'Update an existing React component',
          inputSchema: {
            type: 'object',
            properties: {
              componentName: {
                type: 'string',
                description: 'Name of the component to update',
              },
              content: {
                type: 'string',
                description: 'Updated JSX content',
              },
            },
            required: ['componentName', 'content'],
          },
        },
        {
          name: 'list_pages',
          description: 'List all pages in the app directory',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'get_component_dependencies',
          description: 'Get import dependencies of a component',
          inputSchema: {
            type: 'object',
            properties: {
              componentName: {
                type: 'string',
                description: 'Name of the component',
              },
            },
            required: ['componentName'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'list_react_components':
            return await this.listReactComponents();
          
          case 'read_component':
            return await this.readComponent(args.componentName);
          
          case 'create_component':
            return await this.createComponent(
              args.componentName,
              args.content,
              args.isClient || false
            );
          
          case 'update_component':
            return await this.updateComponent(args.componentName, args.content);
          
          case 'list_pages':
            return await this.listPages();
          
          case 'get_component_dependencies':
            return await this.getComponentDependencies(args.componentName);
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async listReactComponents() {
    try {
      const files = await fs.readdir(this.componentsPath);
      const components = files
        .filter((file) => file.endsWith('.jsx') || file.endsWith('.js'))
        .map((file) => file.replace(/\.(jsx|js)$/, ''));

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ components }, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list components: ${error.message}`);
    }
  }

  async readComponent(componentName) {
    try {
      const filePath = path.join(this.componentsPath, `${componentName}.jsx`);
      const content = await fs.readFile(filePath, 'utf-8');
      
      return {
        content: [
          {
            type: 'text',
            text: content,
          },
        ],
      };
    } catch (error) {
      // Try .js extension if .jsx fails
      try {
        const filePath = path.join(this.componentsPath, `${componentName}.js`);
        const content = await fs.readFile(filePath, 'utf-8');
        
        return {
          content: [
            {
              type: 'text',
              text: content,
            },
          ],
        };
      } catch (err) {
        throw new Error(`Component not found: ${componentName}`);
      }
    }
  }

  async createComponent(componentName, content, isClient = false) {
    try {
      const filePath = path.join(this.componentsPath, `${componentName}.jsx`);
      
      // Check if component already exists
      try {
        await fs.access(filePath);
        throw new Error(`Component ${componentName} already exists`);
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }

      const fullContent = isClient ? `'use client';\n\n${content}` : content;
      await fs.writeFile(filePath, fullContent, 'utf-8');

      return {
        content: [
          {
            type: 'text',
            text: `Component ${componentName} created successfully at ${filePath}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to create component: ${error.message}`);
    }
  }

  async updateComponent(componentName, content) {
    try {
      let filePath = path.join(this.componentsPath, `${componentName}.jsx`);
      
      // Check if .jsx exists, otherwise try .js
      try {
        await fs.access(filePath);
      } catch {
        filePath = path.join(this.componentsPath, `${componentName}.js`);
        await fs.access(filePath);
      }

      await fs.writeFile(filePath, content, 'utf-8');

      return {
        content: [
          {
            type: 'text',
            text: `Component ${componentName} updated successfully`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to update component: ${error.message}`);
    }
  }

  async listPages() {
    try {
      const pages = [];
      
      async function scanDirectory(dir, relativePath = '') {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          const relPath = path.join(relativePath, entry.name);
          
          if (entry.isDirectory()) {
            await scanDirectory(fullPath, relPath);
          } else if (entry.name === 'page.jsx' || entry.name === 'page.js') {
            pages.push(relPath.replace(/[/\\]page\.(jsx|js)$/, '') || '/');
          }
        }
      }
      
      await scanDirectory(this.appPath);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ pages }, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list pages: ${error.message}`);
    }
  }

  async getComponentDependencies(componentName) {
    try {
      let filePath = path.join(this.componentsPath, `${componentName}.jsx`);
      let content;
      
      try {
        content = await fs.readFile(filePath, 'utf-8');
      } catch {
        filePath = path.join(this.componentsPath, `${componentName}.js`);
        content = await fs.readFile(filePath, 'utf-8');
      }

      // Extract import statements
      const importRegex = /import\s+(?:{[^}]*}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:{[^}]*}|\*\s+as\s+\w+|\w+))*\s+from\s+['"]([^'"]+)['"]/g;
      const imports = [];
      let match;
      
      while ((match = importRegex.exec(content)) !== null) {
        imports.push(match[1]);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ dependencies: imports }, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to get dependencies: ${error.message}`);
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('React Bit MCP Server running on stdio');
  }
}

const server = new ReactBitMCPServer();
server.run().catch(console.error);

