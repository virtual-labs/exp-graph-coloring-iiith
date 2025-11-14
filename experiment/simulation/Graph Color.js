class GraphColoring {
    constructor() {
        this.canvas = document.getElementById('graphCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.vertexCount = 6;
        this.colorCount = 3;
        this.vertices = [];
        this.edges = [];
        this.adjacencyMatrix = [];
        this.vertexColors = [];
        this.selectedColor = null;
        this.colorPalette = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899'];
        
        // Visual constants
        this.vertexRadius = 25;
        this.colors = {
            vertex: '#e5e7eb',
            edge: '#6b7280',
            background: '#ffffff',
            selected: '#374151'
        };
        
        this.setupCanvas();
        this.generateGraph();
        this.setupColorPalette();
    }
    
    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const containerStyle = window.getComputedStyle(container);
        const containerWidth = container.clientWidth - 
            parseFloat(containerStyle.paddingLeft) - 
            parseFloat(containerStyle.paddingRight);
        
        const containerHeight = Math.min(containerWidth * 0.6, 400);
        
        this.canvas.style.width = containerWidth + 'px';
        this.canvas.style.height = containerHeight + 'px';
        
        const scale = window.devicePixelRatio || 1;
        this.canvas.width = containerWidth * scale;
        this.canvas.height = containerHeight * scale;
        
        this.ctx.scale(scale, scale);
        this.draw();
    }
    
    generateGraph() {
        this.vertices = [];
        this.edges = [];
        this.adjacencyMatrix = [];
        this.vertexColors = new Array(this.vertexCount).fill(null);
        
        this.hideFeedback();
        
        // Generate vertices in a circle for better visualization
        const canvasWidth = this.canvas.width / (window.devicePixelRatio || 1);
        const canvasHeight = this.canvas.height / (window.devicePixelRatio || 1);
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        const radius = Math.min(centerX, centerY) * 0.7;
        
        for (let i = 0; i < this.vertexCount; i++) {
            const angle = (2 * Math.PI * i) / this.vertexCount - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            this.vertices.push({ x, y, id: i, label: String.fromCharCode(65 + i) });
        }
        
        // Initialize adjacency matrix
        this.adjacencyMatrix = Array(this.vertexCount).fill().map(() => Array(this.vertexCount).fill(0));
        
        // Generate a connected graph with moderate density
        this.generateConnectedGraph();
        
        this.updateGraphInfo();
        this.draw();
    }
    
    generateConnectedGraph() {
        // First ensure connectivity by creating a cycle
        for (let i = 0; i < this.vertexCount; i++) {
            const next = (i + 1) % this.vertexCount;
            this.addEdge(i, next);
        }
        
        // Add random edges for complexity
        const targetEdges = Math.floor(this.vertexCount * 1.5);
        while (this.edges.length < targetEdges) {
            const v1 = Math.floor(Math.random() * this.vertexCount);
            const v2 = Math.floor(Math.random() * this.vertexCount);
            
            if (v1 !== v2 && this.adjacencyMatrix[v1][v2] === 0) {
                this.addEdge(v1, v2);
            }
        }
    }
    
    addEdge(v1, v2) {
        this.adjacencyMatrix[v1][v2] = 1;
        this.adjacencyMatrix[v2][v1] = 1;
        this.edges.push({ v1, v2 });
    }
    
    setupColorPalette() {
        const paletteContainer = document.getElementById('colorPalette');
        if (!paletteContainer) return;
        
        paletteContainer.innerHTML = '';
        
        for (let i = 0; i < this.colorCount; i++) {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'w-8 h-8 rounded cursor-pointer border-2 border-gray-300 hover:border-gray-500 transition-colors';
            colorDiv.style.backgroundColor = this.colorPalette[i];
            colorDiv.addEventListener('click', () => this.selectColor(i));
            paletteContainer.appendChild(colorDiv);
        }
        
        // Add clear color option
        const clearDiv = document.createElement('div');
        clearDiv.className = 'w-8 h-8 rounded cursor-pointer border-2 border-gray-300 hover:border-gray-500 transition-colors bg-white flex items-center justify-center text-gray-500 text-xs font-bold';
        clearDiv.textContent = '×';
        clearDiv.addEventListener('click', () => this.selectColor(null));
        paletteContainer.appendChild(clearDiv);
    }
    
    selectColor(colorIndex) {
        this.selectedColor = colorIndex;
        
        // Update visual feedback
        const colorDivs = document.querySelectorAll('#colorPalette > div');
        colorDivs.forEach((div, index) => {
            if (index === colorIndex || (colorIndex === null && index === colorDivs.length - 1)) {
                div.classList.add('border-gray-800');
                div.classList.remove('border-gray-300');
            } else {
                div.classList.add('border-gray-300');
                div.classList.remove('border-gray-800');
            }
        });
    }
    
    handleCanvasClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Find clicked vertex
        for (let vertex of this.vertices) {
            const dx = x - vertex.x;
            const dy = y - vertex.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance <= this.vertexRadius) {
                this.colorVertex(vertex.id);
                break;
            }
        }
    }
    
    colorVertex(vertexId) {
        this.vertexColors[vertexId] = this.selectedColor;
        this.draw();
    }
    
    draw() {
        const canvasWidth = this.canvas.width / (window.devicePixelRatio || 1);
        const canvasHeight = this.canvas.height / (window.devicePixelRatio || 1);
        
        // Clear canvas
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        // Draw edges
        this.drawEdges();
        
        // Draw vertices
        this.drawVertices();
    }
    
    drawEdges() {
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = this.colors.edge;
        
        for (let edge of this.edges) {
            const v1 = this.vertices[edge.v1];
            const v2 = this.vertices[edge.v2];
            
            this.ctx.beginPath();
            this.ctx.moveTo(v1.x, v1.y);
            this.ctx.lineTo(v2.x, v2.y);
            this.ctx.stroke();
        }
    }
    
    drawVertices() {
        for (let vertex of this.vertices) {
            const color = this.vertexColors[vertex.id];
            let fillColor = color !== null ? this.colorPalette[color] : this.colors.vertex;
            
            // Draw vertex shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.beginPath();
            this.ctx.arc(vertex.x + 2, vertex.y + 2, this.vertexRadius, 0, 2 * Math.PI);
            this.ctx.fill();
            
            // Draw vertex
            this.ctx.fillStyle = fillColor;
            this.ctx.beginPath();
            this.ctx.arc(vertex.x, vertex.y, this.vertexRadius, 0, 2 * Math.PI);
            this.ctx.fill();
            
            this.ctx.strokeStyle = '#374151';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Draw vertex label
            this.ctx.fillStyle = color !== null ? 'white' : '#374151';
            this.ctx.font = 'bold 16px Poppins';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(vertex.label, vertex.x, vertex.y);
        }
    }
    
    checkColoring() {
        // Check if all vertices are colored
        if (this.vertexColors.some(color => color === null)) {
            this.showFeedback(false, 'Please color all vertices!');
            return;
        }
        
        // Check if coloring is valid
        for (let edge of this.edges) {
            const color1 = this.vertexColors[edge.v1];
            const color2 = this.vertexColors[edge.v2];
            
            if (color1 === color2) {
                this.showFeedback(false, `Invalid! Vertices ${this.vertices[edge.v1].label} and ${this.vertices[edge.v2].label} are adjacent and have the same color.`);
                return;
            }
        }
        
        // Check if solution uses exactly the allowed number of colors
        const usedColors = new Set(this.vertexColors.filter(c => c !== null));
        if (usedColors.size > this.colorCount) {
            this.showFeedback(false, `You used ${usedColors.size} colors, but only ${this.colorCount} are allowed!`);
            return;
        }
        
        this.showFeedback(true, `Excellent! Valid coloring using ${usedColors.size} colors.`);
    }
    
    solveAutomatically() {
        const solution = this.greedyColoring();
        
        if (solution === null) {
            this.showFeedback(false, `No valid coloring possible with ${this.colorCount} colors. Try increasing the number of colors.`);
            return;
        }
        
        this.vertexColors = solution;
        this.draw();
        
        const usedColors = new Set(solution.filter(c => c !== null && c >= 0));
        this.showFeedback(true, `Solution found using ${usedColors.size} colors (Greedy algorithm).`);
    }
    
    greedyColoring() {
        const colors = new Array(this.vertexCount).fill(-1);
        
        // Color first vertex with color 0
        colors[0] = 0;
        
        // Color remaining vertices
        for (let v = 1; v < this.vertexCount; v++) {
            const available = new Array(this.colorCount).fill(true);
            
            // Mark colors of adjacent vertices as unavailable
            for (let u = 0; u < this.vertexCount; u++) {
                if (this.adjacencyMatrix[v][u] === 1 && colors[u] !== -1) {
                    if (colors[u] < this.colorCount) {
                        available[colors[u]] = false;
                    }
                }
            }
            
            // Find first available color
            let colorAssigned = false;
            for (let c = 0; c < this.colorCount; c++) {
                if (available[c]) {
                    colors[v] = c;
                    colorAssigned = true;
                    break;
                }
            }
            
            // If no color available within limit, return null (no solution)
            if (!colorAssigned) {
                return null;
            }
        }
        
        return colors;
    }
    
    calculateChromaticNumber() {
        // Try to find minimum colors needed using a more thorough approach
        for (let k = 1; k <= this.vertexCount; k++) {
            const tempColorCount = this.colorCount;
            this.colorCount = k;
            const solution = this.greedyColoring();
            this.colorCount = tempColorCount;
            
            if (solution !== null) {
                return k;
            }
        }
        return this.vertexCount; // Worst case
    }
    
    clearColoring() {
        this.vertexColors.fill(null);
        this.selectedColor = null;
        this.hideFeedback();
        
        // Reset color palette selection
        const colorDivs = document.querySelectorAll('#colorPalette > div');
        colorDivs.forEach(div => {
            div.classList.add('border-gray-300');
            div.classList.remove('border-gray-800');
        });
        
        this.draw();
    }
    
    showFeedback(isCorrect, message) {
        const feedbackElement = document.getElementById('feedback');
        if (!feedbackElement) return;
        
        feedbackElement.classList.remove('hidden', 'bg-green-100', 'bg-red-100', 'text-green-800', 'text-red-800');
        
        if (isCorrect) {
            feedbackElement.classList.add('bg-green-100', 'text-green-800');
        } else {
            feedbackElement.classList.add('bg-red-100', 'text-red-800');
        }
        
        feedbackElement.textContent = message;
    }
    
    hideFeedback() {
        const feedbackElement = document.getElementById('feedback');
        if (feedbackElement) {
            feedbackElement.classList.add('hidden');
        }
    }
    
    updateGraphInfo() {
        const vertexCountElement = document.getElementById('vertexCount');
        const edgeCountElement = document.getElementById('edgeCount');
        const chromaticNumberElement = document.getElementById('chromaticNumber');
        
        if (vertexCountElement) {
            vertexCountElement.textContent = this.vertexCount;
        }
        if (edgeCountElement) {
            edgeCountElement.textContent = this.edges.length;
        }
        if (chromaticNumberElement) {
            const chromaticNumber = this.calculateChromaticNumber();
            chromaticNumberElement.textContent = chromaticNumber;
        }
    }
    
    updateVertexCount() {
        const slider = document.getElementById('vertexCountSlider');
        if (!slider) return;
        
        this.vertexCount = parseInt(slider.value);
        const valueElement = document.getElementById('vertexCountValue');
        if (valueElement) {
            valueElement.textContent = this.vertexCount;
        }
        this.generateGraph();
    }
    
    updateColorCount() {
        const slider = document.getElementById('colorCountSlider');
        if (!slider) return;
        
        this.colorCount = parseInt(slider.value);
        
        const valueElement = document.getElementById('colorCountValue');
        const countElement = document.getElementById('colorCount');
        
        if (valueElement) {
            valueElement.textContent = this.colorCount;
        }
        if (countElement) {
            countElement.textContent = this.colorCount;
        }
        
        this.setupColorPalette();
        this.clearColoring();
    }
}

// Global game instance
let graphGame;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    graphGame = new GraphColoring();
    
    // Update the initial slider values
    const vertexCountSlider = document.getElementById('vertexCountSlider');
    const colorCountSlider = document.getElementById('colorCountSlider');
    
    if (vertexCountSlider) {
        vertexCountSlider.value = graphGame.vertexCount;
        const valueElement = document.getElementById('vertexCountValue');
        if (valueElement) {
            valueElement.textContent = graphGame.vertexCount;
        }
    }
    
    if (colorCountSlider) {
        colorCountSlider.value = graphGame.colorCount;
        const valueElement = document.getElementById('colorCountValue');
        const countElement = document.getElementById('colorCount');
        
        if (valueElement) {
            valueElement.textContent = graphGame.colorCount;
        }
        if (countElement) {
            countElement.textContent = graphGame.colorCount;
        }
    }
});

// Control functions
function updateVertexCount() {
    if (graphGame) {
        graphGame.updateVertexCount();
    }
}

function updateColorCount() {
    if (graphGame) {
        graphGame.updateColorCount();
    }
}

function generateNewGraph() {
    if (graphGame) {
        graphGame.generateGraph();
    }
}

function clearColoring() {
    if (graphGame) {
        graphGame.clearColoring();
    }
}

function checkColoring() {
    if (graphGame) {
        graphGame.checkColoring();
    }
}

function solveAutomatically() {
    if (graphGame) {
        graphGame.solveAutomatically();
    }
}

// Floating Panel Controls
document.addEventListener('DOMContentLoaded', function() {
    // Controls panel
    const controlsButton = document.getElementById('controlsButton');
    const controlsPanel = document.getElementById('controlsPanel');
    const controlsPanelClose = document.getElementById('controlsPanelClose');
    
    // Info panel
    const infoButton = document.getElementById('infoButton');
    const infoPanel = document.getElementById('infoPanel');
    const infoPanelClose = document.getElementById('infoPanelClose');
    
    // Panel toggle functions
    function togglePanel(panel, button, otherPanel) {
        if (!panel) return;
        
        const isActive = panel.classList.contains('active');
        // Close other panel if active
        if (otherPanel && otherPanel.classList.contains('active')) {
            otherPanel.classList.remove('active');
        }
        // Toggle current panel
        if (isActive) {
            panel.classList.remove('active');
        } else {
            panel.classList.add('active');
        }
    }
    
    // Control panel events
    if (controlsButton) {
        controlsButton.addEventListener('click', function() {
            togglePanel(controlsPanel, controlsButton, infoPanel);
        });
    }
    
    if (controlsPanelClose) {
        controlsPanelClose.addEventListener('click', function() {
            if (controlsPanel) {
                controlsPanel.classList.remove('active');
            }
        });
    }
    
    // Info panel events
    if (infoButton) {
        infoButton.addEventListener('click', function() {
            togglePanel(infoPanel, infoButton, controlsPanel);
        });
    }
    
    if (infoPanelClose) {
        infoPanelClose.addEventListener('click', function() {
            if (infoPanel) {
                infoPanel.classList.remove('active');
            }
        });
    }
    
    // Close panels when clicking outside
    document.addEventListener('click', function(event) {
        if (controlsPanel && !controlsPanel.contains(event.target) && 
            controlsButton && !controlsButton.contains(event.target) && 
            controlsPanel.classList.contains('active')) {
            controlsPanel.classList.remove('active');
        }
        if (infoPanel && !infoPanel.contains(event.target) && 
            infoButton && !infoButton.contains(event.target) && 
            infoPanel.classList.contains('active')) {
            infoPanel.classList.remove('active');
        }
    });
});