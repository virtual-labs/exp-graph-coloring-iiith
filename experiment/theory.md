
**Graph coloring** is the procedure of assignment of colors to each vertex of a graph G such that no adjacent vertices get same color. The objective is to minimize the number of colors while coloring a graph. The smallest number of colors required to color a graph G is called its chromatic number of that graph.
This is also known as vertex coloring.

***Chromatic Number:*** 
The smallest number of colours needed to colour a graph G is called its chromatic number.

![Example](images/ex2.png)

For example, in the above image, vertices can be coloured using a minimum of 2 colours.Hence the chromatic number of the graph is 2.

#### Method to Color a Graph

The steps required to color a graph G with n number of vertices are as follows −

- Step 1 − Arrange the vertices of the graph in some order.

- Step 2 − Choose the first vertex and color it with the first color.

- Step 3 − Choose the next vertex and color it with the lowest numbered color that has not been colored on any vertices adjacent to it. If all the adjacent vertices are colored with this color, assign a new color to it. Repeat this step until all the vertices are colored.

![Example](images/ex4.png)

In the above figure, at first vertex 1 is colored red. As the adjacent vertices of vertex 1 are again adjacent, vertex 2 and vertex 4 are colored with different color, yellow and blue respectively. Then vertex 3 is colored as red as no adjacent vertex of c is colored red. Hence, we could color the graph by minimum 3 colors. Hence, the chromatic number of the graph is 3.

**Applications of Graph Colouring:**

* Map Coloring
* Scheduling the tasks
* Preparing Time Table
* Assignment
* Conflict Resolution
* Sudoku
