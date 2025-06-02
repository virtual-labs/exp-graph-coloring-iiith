### Graph Coloring Procedure

Objective
To color all vertices in a graph such that no two adjacent vertices share the same color, using a sequential coloring approach.

Steps to Follow

1. Initial Arrangement
   - Arrange the vertices of the graph in some order.

2. First Color Assignment
   - Choose the first vertex and color it with the first color.

3. Sequential Vertex Coloring
   - Choose the next vertex
   - Color it with the lowest numbered color that has not been colored on any vertices adjacent to it
   - If all the adjacent vertices are colored with this color, assign a new color to it
   - Repeat this step until all the vertices are colored
