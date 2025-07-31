# Graph Coloring Experiment Procedure

## Objective

To understand the concept of graph coloring by interactively coloring vertices of a graph such that no two adjacent (connected) vertices share the same color, using the minimum number of colors possible.

## Prerequisites

- Basic understanding of graphs (vertices and edges)
- Familiarity with the concept of adjacency in graphs

## Getting Started with the Simulation

### Step 1: Understanding the Interface

1. **Graph Display Area**: The main canvas shows a randomly generated graph with vertices (circles) and edges (lines connecting vertices)
2. **Color Palette**: Located below the challenge section, displays available colors for vertex coloring
3. **Control Buttons**:
   - "Check Coloring" - Validates your current coloring attempt
   - "Show Solution" - Displays an automatic optimal coloring
   - "New Graph" - Generates a different random graph
   - "Clear Colors" - Removes all vertex colors to start fresh

### Step 2: Customizing Graph Parameters (Optional)

1. Click the **floating controls button** (⚙️ icon) in the bottom-right corner
2. Adjust the following parameters using sliders:
   - **Number of Vertices**: Choose between 4-10 vertices
   - **Number of Colors**: Select 2-6 available colors
3. Observe how the **Graph Info** section updates with:
   - Total number of vertices and edges
   - Chromatic number (minimum colors needed)

## Interactive Coloring Procedure

### Step 3: Color Selection

1. **Select a Color**: Click on any color from the color palette
   - The selected color will be highlighted with a darker border
   - Available colors are displayed as colored circles
   - A clear option (×) allows you to remove colors from vertices

### Step 4: Vertex Coloring Process

1. **Choose a Starting Vertex**: Click on any vertex in the graph
   - The vertex will be colored with your selected color
   - Vertex labels (A, B, C, etc.) help identify each vertex

2. **Apply Strategic Coloring**:
   - **Rule**: No two adjacent vertices can have the same color
   - **Strategy**: Start with vertices that have the most connections (highest degree)
   - **Tip**: Try to use as few colors as possible for an optimal solution

3. **Continue Coloring**:
   - Select different colors from the palette as needed
   - Color remaining vertices while respecting the adjacency constraint
   - Use the visual feedback to identify connections between vertices

### Step 5: Solution Validation

1. **Check Your Work**: Click the "Check Coloring" button
   - **Success Message**: "Excellent! Valid coloring using X colors."
   - **Error Messages**:
     - "Please color all vertices!" (if some vertices remain uncolored)
     - "Invalid! Vertices X and Y are adjacent and have the same color." (if constraint violated)

2. **Feedback Interpretation**:
   - Green feedback indicates a valid coloring
   - Red feedback indicates errors that need correction
   - The system checks both completeness and correctness

### Step 6: Learning from Automatic Solutions

1. **View Optimal Solution**: Click "Show Solution" to see an algorithmic coloring
2. **Compare Results**: Observe how the automatic solution differs from your attempt
3. **Analyze Efficiency**: Note the number of colors used in the optimal solution

## Advanced Exploration

### Step 7: Experimenting with Different Graphs

1. **Generate New Challenges**: Use "New Graph" to practice with different graph structures
2. **Vary Complexity**: Adjust vertex count to experience graphs of different sizes
3. **Color Constraints**: Experiment with different numbers of available colors

### Step 8: Understanding Graph Properties

1. **Observe Patterns**:
   - **Complete Graphs**: Require as many colors as vertices
   - **Bipartite Graphs**: Can be colored with only 2 colors
   - **Trees**: Always require exactly 2 colors

2. **Chromatic Number Analysis**:
   - Compare your color usage with the theoretical minimum
   - Understand how graph structure affects coloring complexity

## Learning Outcomes

Upon completion of this experiment, you will be able to:

1. Apply the graph coloring constraint practically
2. Develop strategies for efficient vertex coloring
3. Understand the relationship between graph structure and chromatic number
4. Recognize real-world applications of graph coloring problems

## Troubleshooting Tips

- **Mobile Users**: The interface is optimized for touch interaction
- **Color Selection**: Ensure a color is selected before clicking vertices
- **Visual Clarity**: Use the floating info panel (ℹ️) for additional guidance
- **Reset Option**: Use "Clear Colors" to start over without generating a new graph