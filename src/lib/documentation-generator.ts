/**
 * Automated Documentation Generator
 * Generate comprehensive documentation from codebase
 */

import fs from 'fs'
import path from 'path'
import { glob } from 'glob'

export interface DocumentationConfig {
  inputDir: string
  outputDir: string
  includePrivate: boolean
  includeInternal: boolean
  templates: {
    component: string
    api: string
    utility: string
    readme: string
  }
}

export interface ComponentDoc {
  name: string
  description: string
  props: PropDoc[]
  examples: ExampleDoc[]
  category: string
  tags: string[]
  sourcePath: string
}

export interface PropDoc {
  name: string
  type: string
  required: boolean
  defaultValue?: string
  description: string
}

export interface ExampleDoc {
  title: string
  description: string
  code: string
  live?: boolean
}

export interface ApiDoc {
  endpoint: string
  method: string
  description: string
  parameters: ParameterDoc[]
  responses: ResponseDoc[]
  examples: ExampleDoc[]
}

export interface ParameterDoc {
  name: string
  type: string
  required: boolean
  description: string
  validation?: string
}

export interface ResponseDoc {
  statusCode: number
  description: string
  schema: any
  example?: any
}

class DocumentationGenerator {
  private config: DocumentationConfig
  private components: ComponentDoc[] = []
  private apis: ApiDoc[] = []
  private utilities: any[] = []

  constructor(config: DocumentationConfig) {
    this.config = config
  }

  // Generate all documentation
  async generateAll(): Promise<void> {
    console.log('📚 Generating documentation...')
    
    await this.createOutputDirectory()
    await this.scanComponents()
    await this.scanApiRoutes()
    await this.scanUtilities()
    await this.generateComponentDocs()
    await this.generateApiDocs()
    await this.generateUtilityDocs()
    await this.generateReadme()
    await this.generateChangelog()
    await this.copyAssets()
    
    console.log('✅ Documentation generated successfully!')
  }

  // Create output directory
  private async createOutputDirectory(): Promise<void> {
    if (!fs.existsSync(this.config.outputDir)) {
      fs.mkdirSync(this.config.outputDir, { recursive: true })
    }
    
    // Create subdirectories
    const subdirs = ['components', 'api', 'utilities', 'assets', 'examples']
    subdirs.forEach(dir => {
      const fullPath = path.join(this.config.outputDir, dir)
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true })
      }
    })
  }

  // Scan React components
  private async scanComponents(): Promise<void> {
    console.log('  🔍 Scanning components...')
    
    const componentFiles = await glob('**/*.{tsx,jsx}', {
      cwd: this.config.inputDir,
      ignore: ['**/*.test.*', '**/*.stories.*', '**/node_modules/**']
    })

    for (const file of componentFiles) {
      const component = await this.parseComponent(file)
      if (component) {
        this.components.push(component)
      }
    }
  }

  // Parse component file
  private async parseComponent(filePath: string): Promise<ComponentDoc | null> {
    const fullPath = path.join(this.config.inputDir, filePath)
    const content = fs.readFileSync(fullPath, 'utf-8')
    
    // Extract component information
    const componentMatch = content.match(/export\s+(?:const|function)\s+(\w+).*?=\s*\(([^)]*)\)/s)
    if (!componentMatch) return null
    
    const name = componentMatch[1]
    
    // Extract description from JSDoc
    const descriptionMatch = content.match(/\/\*\*\s*\n\s*\*\s*(.*?)\s*\n/)
    const description = descriptionMatch ? descriptionMatch[1] : ''
    
    // Extract props from TypeScript interface or JSDoc
    const props = this.extractProps(content)
    
    // Extract examples
    const examples = this.extractExamples(content, name)
    
    // Determine category
    const category = this.determineCategory(filePath)
    
    return {
      name,
      description,
      props,
      examples,
      category,
      tags: this.extractTags(content),
      sourcePath: filePath
    }
  }

  // Extract component props
  private extractProps(content: string): PropDoc[] {
    const props: PropDoc[] = []
    
    // Try to extract from TypeScript interface
    const interfaceMatch = content.match(/interface\s+(\w*Props)\s*{([^}]*)}/s)
    if (interfaceMatch) {
      const interfaceBody = interfaceMatch[2]
      const propMatches = interfaceBody.matchAll(/(\w+)(\?)?:\s*([^;]+);(?:\s*\/\/\s*(.*))?/g)
      
      for (const match of propMatches) {
        props.push({
          name: match[1],
          type: match[3].trim(),
          required: !match[2],
          description: match[4] || ''
        })
      }
    }
    
    return props
  }

  // Extract examples from component file
  private extractExamples(content: string, componentName: string): ExampleDoc[] {
    const examples: ExampleDoc[] = []
    
    // Look for @example tags in JSDoc
    const exampleMatches = content.matchAll(/@example\s*(.*?)\s*```(tsx?|jsx?)\s*(.*?)```/gs)
    
    for (const match of exampleMatches) {
      examples.push({
        title: match[1].trim() || 'Example',
        description: '',
        code: match[3].trim(),
        live: true
      })
    }
    
    return examples
  }

  // Determine component category
  private determineCategory(filePath: string): string {
    if (filePath.includes('/ui/')) return 'UI Components'
    if (filePath.includes('/layout/')) return 'Layout'
    if (filePath.includes('/sections/')) return 'Sections'
    if (filePath.includes('/forms/')) return 'Forms'
    return 'Components'
  }

  // Extract tags from content
  private extractTags(content: string): string[] {
    const tags: string[] = []
    
    // Extract from JSDoc @tags
    const tagMatches = content.matchAll(/@tag\s+(\w+)/g)
    for (const match of tagMatches) {
      tags.push(match[1])
    }
    
    return tags
  }

  // Scan API routes
  private async scanApiRoutes(): Promise<void> {
    console.log('  🔍 Scanning API routes...')
    
    const apiFiles = await glob('**/api/**/route.{ts,js}', {
      cwd: this.config.inputDir,
      ignore: ['**/node_modules/**']
    })

    for (const file of apiFiles) {
      const api = await this.parseApiRoute(file)
      if (api) {
        this.apis.push(api)
      }
    }
  }

  // Parse API route
  private async parseApiRoute(filePath: string): Promise<ApiDoc | null> {
    const fullPath = path.join(this.config.inputDir, filePath)
    const content = fs.readFileSync(fullPath, 'utf-8')
    
    // Extract HTTP methods
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
    const endpoint = '/' + filePath.replace(/\/route\.(ts|js)$/, '').replace(/\\/g, '/')
    
    const apiDoc: ApiDoc = {
      endpoint,
      method: 'GET', // Default, will be updated
      description: '',
      parameters: [],
      responses: [],
      examples: []
    }
    
    // Extract description from JSDoc
    const descMatch = content.match(/\/\*\*\s*\n\s*\*\s*(.*?)\s*\n/)
    if (descMatch) {
      apiDoc.description = descMatch[1]
    }
    
    // Extract method handlers
    for (const method of methods) {
      const methodMatch = content.match(new RegExp(`export\\s+async\\s+function\\s+${method}\\s*\\(`, 'i'))
      if (methodMatch) {
        apiDoc.method = method
        break
      }
    }
    
    // Extract parameters and responses
    this.extractApiParameters(content, apiDoc)
    this.extractApiResponses(content, apiDoc)
    
    return apiDoc
  }

  // Extract API parameters
  private extractApiParameters(content: string, apiDoc: ApiDoc): void {
    // Look for request body schema
    const bodyMatch = content.match(/const\s+schema\s*=\s*({[\s\S]*?})/)
    if (bodyMatch) {
      try {
        const schema = eval(`(${bodyMatch[1]})`)
        this.parseSchemaToParameters(schema, apiDoc.parameters)
      } catch (e) {
        console.warn('Failed to parse API schema:', e)
      }
    }
  }

  // Extract API responses
  private extractApiResponses(content: string, apiDoc: ApiDoc): void {
    // Look for response examples
    const responseMatches = content.matchAll(/\/\/\s*@response\s+(\d+)\s*(.*?)\s*```json\s*(.*?)```/gs)
    
    for (const match of responseMatches) {
      apiDoc.responses.push({
        statusCode: parseInt(match[1]),
        description: match[2].trim(),
        schema: null,
        example: match[3].trim()
      })
    }
  }

  // Parse schema to parameters
  private parseSchemaToParameters(schema: any, parameters: ParameterDoc[]): void {
    if (schema.properties) {
      for (const [key, value] of Object.entries(schema.properties as any)) {
        parameters.push({
          name: key,
          type: (value as any).type || 'unknown',
          required: schema.required?.includes(key) || false,
          description: (value as any).description || ''
        })
      }
    }
  }

  // Scan utilities
  private async scanUtilities(): Promise<void> {
    console.log('  🔍 Scanning utilities...')
    
    const utilityFiles = await glob('**/lib/**/*.{ts,js}', {
      cwd: this.config.inputDir,
      ignore: ['**/node_modules/**', '**/*.test.*']
    })

    for (const file of utilityFiles) {
      const utility = await this.parseUtility(file)
      if (utility) {
        this.utilities.push(utility)
      }
    }
  }

  // Parse utility file
  private async parseUtility(filePath: string): Promise<any> {
    const fullPath = path.join(this.config.inputDir, filePath)
    const content = fs.readFileSync(fullPath, 'utf-8')
    
    // Extract exported functions
    const functions = []
    const functionMatches = content.matchAll(/export\s+(?:const|function)\s+(\w+).*?=\s*(\([^)]*\)|[^=]+)/g)
    
    for (const match of functionMatches) {
      functions.push({
        name: match[1],
        signature: match[2],
        description: this.extractFunctionDescription(content, match[1])
      })
    }
    
    return {
      name: path.basename(filePath, path.extname(filePath)),
      filePath,
      functions
    }
  }

  // Extract function description
  private extractFunctionDescription(content: string, functionName: string): string {
    const regex = new RegExp(`export\\s+(?:const|function)\\s+${functionName}[^/]*\\/\\*\\*\\s*\\n\\s*\\*\\s*(.*?)\\s*\\n`)
    const match = content.match(regex)
    return match ? match[1] : ''
  }

  // Generate component documentation
  private async generateComponentDocs(): Promise<void> {
    console.log('  📝 Generating component docs...')
    
    for (const component of this.components) {
      const doc = this.generateComponentMarkdown(component)
      const outputPath = path.join(this.config.outputDir, 'components', `${component.name.toLowerCase()}.md`)
      fs.writeFileSync(outputPath, doc)
    }
    
    // Generate component index
    await this.generateComponentIndex()
  }

  // Generate component markdown
  private generateComponentMarkdown(component: ComponentDoc): string {
    return `# ${component.name}

${component.description}

## Category
${component.category}

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
${component.props.map(prop => 
  `| ${prop.name} | \`${prop.type}\` | ${prop.required ? 'Yes' : 'No'} | ${prop.defaultValue || '-'} | ${prop.description} |`
).join('\n')}

## Examples

${component.examples.map(example => `
### ${example.title}

${example.description ? `${example.description}\n\n` : ''}

\`\`\`tsx
${example.code}
\`\`\`

${example.live ? '[▶️ Live Demo](#)' : ''}
`).join('\n')}

## Source

[View Source](${component.sourcePath})

---

${component.tags.map(tag => `\`${tag}\``).join(' ')}
`
  }

  // Generate component index
  private async generateComponentIndex(): Promise<void> {
    const categories = this.groupComponentsByCategory()
    
    let index = `# Components

This documentation covers all available components in the design system.

## Categories

${Object.entries(categories).map(([category, components]) => `
### ${category}

${components.map(comp => 
  `- [${comp.name}](components/${comp.name.toLowerCase()}.md) - ${comp.description}`
).join('\n')}
`).join('\n')}

## Quick Reference

| Component | Category | Description |
|-----------|----------|-------------|
${this.components.map(comp => 
  `| [${comp.name}](components/${comp.name.toLowerCase()}.md) | ${comp.category} | ${comp.description} |`
).join('\n')}
`
    
    const outputPath = path.join(this.config.outputDir, 'components', 'README.md')
    fs.writeFileSync(outputPath, index)
  }

  // Group components by category
  private groupComponentsByCategory(): Record<string, ComponentDoc[]> {
    return this.components.reduce((acc, component) => {
      if (!acc[component.category]) {
        acc[component.category] = []
      }
      acc[component.category].push(component)
      return acc
    }, {} as Record<string, ComponentDoc[]>)
  }

  // Generate API documentation
  private async generateApiDocs(): Promise<void> {
    console.log('  📝 Generating API docs...')
    
    for (const api of this.apis) {
      const doc = this.generateApiMarkdown(api)
      const outputPath = path.join(this.config.outputDir, 'api', `${api.endpoint.replace(/\//g, '-')}.md`)
      fs.writeFileSync(outputPath, doc)
    }
    
    // Generate API index
    await this.generateApiIndex()
  }

  // Generate API markdown
  private generateApiMarkdown(api: ApiDoc): string {
    return `# ${api.method} ${api.endpoint}

${api.description}

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
${api.parameters.map(param => 
  `| ${param.name} | \`${param.type}\` | ${param.required ? 'Yes' : 'No'} | ${param.description} |`
).join('\n')}

## Responses

${api.responses.map(response => `
### ${response.statusCode} ${response.description}

${response.example ? `
\`\`\`json
${response.example}
\`\`\`
` : ''}
`).join('\n')}

## Examples

${api.examples.map(example => `
### ${example.title}

\`\`\`${example.language}
${example.code}
\`\`\`
`).join('\n')}
`
  }

  // Generate API index
  private async generateApiIndex(): Promise<void> {
    let index = `# API Documentation

This documentation covers all available API endpoints.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
${this.apis.map(api => 
  `| ${api.method} | [${api.endpoint}](api/${api.endpoint.replace(/\//g, '-')}.md) | ${api.description} |`
).join('\n')}
`
    
    const outputPath = path.join(this.config.outputDir, 'api', 'README.md')
    fs.writeFileSync(outputPath, index)
  }

  // Generate utility documentation
  private async generateUtilityDocs(): Promise<void> {
    console.log('  📝 Generating utility docs...')
    
    for (const utility of this.utilities) {
      const doc = this.generateUtilityMarkdown(utility)
      const outputPath = path.join(this.config.outputDir, 'utilities', `${utility.name.toLowerCase()}.md`)
      fs.writeFileSync(outputPath, doc)
    }
  }

  // Generate utility markdown
  private generateUtilityMarkdown(utility: any): string {
    return `# ${utility.name}

## Functions

${utility.functions.map((func: any) => `
### ${func.name}

\`${func.signature}\`

${func.description}
`).join('\n')}

## Source

[View Source](${utility.filePath})
`
  }

  // Generate main README
  private async generateReadme(): Promise<void> {
    const readme = `# MA Malnu Kananga - Documentation

This documentation is automatically generated from the source code.

## Sections

- [Components](components/) - UI component library
- [API](api/) - API endpoints documentation
- [Utilities](utilities/) - Utility functions

## Quick Start

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

### Building

\`\`\`bash
npm run build
\`\`\`

## Overview

- **Components**: ${this.components.length} components
- **API Endpoints**: ${this.apis.length} endpoints
- **Utilities**: ${this.utilities.length} utility modules

## Generated

This documentation was generated on ${new Date().toISOString()}.
`
    
    const outputPath = path.join(this.config.outputDir, 'README.md')
    fs.writeFileSync(outputPath, readme)
  }

  // Generate changelog
  private async generateChangelog(): Promise<void> {
    const changelog = `# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Automated documentation generation
- Component documentation
- API documentation
- Utility documentation

### Changed
- Improved documentation structure

## [1.0.0] - ${new Date().toISOString().split('T')[0]}

### Added
- Initial documentation setup
- Component library documentation
- API endpoint documentation
`
    
    const outputPath = path.join(this.config.outputDir, 'CHANGELOG.md')
    fs.writeFileSync(outputPath, changelog)
  }

  // Copy assets
  private async copyAssets(): Promise<void> {
    // Copy images, styles, and other assets
    const assetsDir = path.join(__dirname, 'assets')
    const outputAssetsDir = path.join(this.config.outputDir, 'assets')
    
    if (fs.existsSync(assetsDir)) {
      this.copyDirectory(assetsDir, outputAssetsDir)
    }
  }

  // Copy directory recursively
  private copyDirectory(src: string, dest: string): void {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true })
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name)
      const destPath = path.join(dest, entry.name)
      
      if (entry.isDirectory()) {
        this.copyDirectory(srcPath, destPath)
      } else {
        fs.copyFileSync(srcPath, destPath)
      }
    }
  }
}

// Export functions
export const generateDocumentation = async (config: DocumentationConfig): Promise<void> => {
  const generator = new DocumentationGenerator(config)
  await generator.generateAll()
}

export const createDocumentationConfig = (inputDir: string, outputDir: string): DocumentationConfig => {
  return {
    inputDir,
    outputDir,
    includePrivate: false,
    includeInternal: false,
    templates: {
      component: 'default',
      api: 'default',
      utility: 'default',
      readme: 'default'
    }
  }
}