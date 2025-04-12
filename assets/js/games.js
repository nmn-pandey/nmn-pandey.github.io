class GameEngine {
    constructor() {
      // Initialize game state flags 
      this.gameEnded = false;
      
      // Wait for DOM to be fully loaded before initializing
      setTimeout(() => {
        this.initializeEngine();
      }, 100);
    }
  
    initializeEngine() {
      this.canvas = document.getElementById('gameCanvas');
      if (!this.canvas) {
        console.error("Canvas element not found!");
        return;
      }
  
      // Set up 2D context
      this.ctx = this.canvas.getContext('2d');
      
      // Set up canvas size
      this.resizeCanvas();
      
      this.currentGame = null;
      this.score = 0;
      this.gameActive = false;
      
      // Initialize buttons and event listeners
      this.initializeButtons();
      window.addEventListener('resize', () => this.resizeCanvas());
      
      // Create background with parallax effect
      this.createBackground();
      
      // Show game selection screen
      this.showGameSelection();
    }
  
    resizeCanvas() {
      this.canvas.width = this.canvas.parentElement.clientWidth;
      this.canvas.height = this.canvas.parentElement.clientHeight;
      
      // If we have a current game, tell it to resize
      if (this.currentGame && typeof this.currentGame.resize === 'function') {
        this.currentGame.resize();
      }
      
      console.log("Canvas resized to:", this.canvas.width, "x", this.canvas.height);
    }
  
    createBackground() {
      // Create parallax background layers
      this.backgroundLayers = [];
      
      // Layer 1: Stars (far)
      const starsLayer = {
        particles: [],
        speed: 0.1,
        draw: () => {
          this.ctx.fillStyle = 'white';
          for (const star of starsLayer.particles) {
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
          }
        },
        update: () => {
          for (const star of starsLayer.particles) {
            star.x -= starsLayer.speed;
            if (star.x < 0) star.x = this.canvas.width;
          }
        }
      };
      
      // Generate stars
      for (let i = 0; i < 100; i++) {
        starsLayer.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: Math.random() * 1.5
        });
      }
      
      // Layer 2: Nebula (middle)
      const nebulaLayer = {
        particles: [],
        speed: 0.2,
        draw: () => {
          for (const nebula of nebulaLayer.particles) {
            this.ctx.fillStyle = nebula.color;
            this.ctx.globalAlpha = 0.1;
            this.ctx.beginPath();
            this.ctx.arc(nebula.x, nebula.y, nebula.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
          }
        },
        update: () => {
          for (const nebula of nebulaLayer.particles) {
            nebula.x -= nebulaLayer.speed;
            if (nebula.x < -nebula.size) nebula.x = this.canvas.width + nebula.size;
          }
        }
      };
      
      // Generate nebula clouds
      const colors = ['#FF5E5E', '#5E8AFF', '#5EFFB8'];
      for (let i = 0; i < 20; i++) {
        nebulaLayer.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: 50 + Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      // Layer 3: Meteors (close)
      const meteorLayer = {
        particles: [],
        speed: 0.5,
        draw: () => {
          this.ctx.fillStyle = '#AAA';
          for (const meteor of meteorLayer.particles) {
            this.ctx.beginPath();
            this.ctx.arc(meteor.x, meteor.y, meteor.size, 0, Math.PI * 2);
            this.ctx.fill();
          }
        },
        update: () => {
          for (const meteor of meteorLayer.particles) {
            meteor.x -= meteorLayer.speed;
            if (meteor.x < -meteor.size) {
              meteor.x = this.canvas.width + meteor.size;
              meteor.y = Math.random() * this.canvas.height;
            }
          }
        }
      };
      
      // Generate meteors
      for (let i = 0; i < 5; i++) {
        meteorLayer.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: 2 + Math.random() * 4
        });
      }
      
      this.backgroundLayers = [starsLayer, nebulaLayer, meteorLayer];
      
      // Start background animation
      this.animateBackground();
    }
    
    animateBackground() {
      if (!this.ctx) return;
      
      const animate = () => {
        if (!this.gameActive) {
          // Only draw background when no game is active
          this.ctx.fillStyle = '#000';
          this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
          
          for (const layer of this.backgroundLayers) {
            layer.update();
            layer.draw();
          }
        }
        
        requestAnimationFrame(animate);
      };
      
      animate();
    }
  
    initializeButtons() {
      document.getElementById('snakeBtn').addEventListener('click', () => this.startSnake());
      document.getElementById('tetrisBtn').addEventListener('click', () => this.startTetris());
      document.getElementById('flappyBtn').addEventListener('click', () => this.startFlappyBird());
      document.getElementById('tictactoeBtn').addEventListener('click', () => this.startTicTacToe());
      
      // Add event listener to prevent scrolling during gameplay
      window.addEventListener('keydown', (e) => {
        if (this.gameActive && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
          e.preventDefault();
        }
      });
    }
  
    updateScore(points) {
      // Update internal score
      this.score = points;
      
      // Only update the prompt if the game has ended
      if (this.gameEnded) {
        const promptElement = document.getElementById('gamePrompt');
        if (promptElement) {
          promptElement.textContent = `Game Over! Final Score: ${this.score}`;
          promptElement.classList.remove('hidden');
        }
      } else {
        // Make sure prompt is hidden during active gameplay
        const promptElement = document.getElementById('gamePrompt');
        if (promptElement) {
          promptElement.classList.add('hidden');
        }
      }
    }
    
    showGameSelection() {
      this.gameActive = false;
      this.gameEnded = false; // Reset game ended state
      
      // Enable scrolling
      document.body.style.overflow = 'auto';
      
      // Show game controls
      const controls = document.querySelector('.game-controls');
      if (controls) {
        controls.style.display = 'flex';
      }
      
      // Clear any existing game
      this.cleanupAllGames();
      
      // Reset score
      this.updateScore(0);
      
      // Draw game selection screen
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.fillStyle = 'white';
      this.ctx.font = '30px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Select a Game', this.canvas.width / 2, this.canvas.height / 2 - 50);
    }
    
    // Add a new centralized cleanup method
    cleanupAllGames() {
      // Make sure to properly dispose the current game
      if (this.currentGame) {
        try {
          // Set the game's disposed flag directly
          this.currentGame.disposed = true;
          
          // Cancel any animation frames
          if (this.currentGame.animationFrameId) {
            cancelAnimationFrame(this.currentGame.animationFrameId);
            this.currentGame.animationFrameId = null;
          }
          
          // Remove event listeners
          if (this.currentGame.handleKeyPress) {
            document.removeEventListener('keydown', this.currentGame.handleKeyPress);
          }
          
          // Remove click handler for FlappyBird game
          if (this.currentGame.handleClick && this.canvas) {
            this.canvas.removeEventListener('click', this.currentGame.handleClick);
          }
          
          // Remove any back buttons added by the game
          if (this.currentGame.backBtn && this.currentGame.backBtn.parentNode) {
            this.currentGame.backBtn.parentNode.removeChild(this.currentGame.backBtn);
          }
          
          // If the game has a dispose method, call it for additional cleanup
          if (typeof this.currentGame.dispose === 'function') {
            this.currentGame.dispose();
          }
        } catch (error) {
          console.error("Error during game cleanup:", error);
        }
        
        this.currentGame = null;
      }
      
      // Reset game state flags
      this.gameActive = false;
      this.gameEnded = false;
      this.score = 0;
      
      // Reset the global game state
      if (window.gameState) {
        window.gameState.currentGame = null;
        window.gameState.gameRunning = false;
        window.gameState.pendingStart = false;
        window.gameState.score = 0;
      }
      
      // Show the game prompt with default message
      const promptElement = document.getElementById('gamePrompt');
      if (promptElement) {
        promptElement.textContent = 'Select a game to play';
        promptElement.classList.remove('hidden');
      }
    }
  
    startGame(GameClass) {
      this.gameActive = true;
      this.gameEnded = false; // Reset game ended state
      
      // Reset score at start of new game
      this.score = 0;
      this.updateScore(0);
      
      // Ensure prompt is hidden at game start
      const promptElement = document.getElementById('gamePrompt');
      if (promptElement) {
        promptElement.classList.add('hidden');
      }
      
      // Disable scrolling
      document.body.style.overflow = 'hidden';
      
      // Hide game controls during gameplay
      const controls = document.querySelector('.game-controls');
      if (controls) {
        controls.style.display = 'none';
      }
      
      // Dispose current game if exists
      if (this.currentGame) {
        try {
          if (typeof this.currentGame.dispose === 'function') {
            this.currentGame.dispose();
          }
        } catch (error) {
          console.error("Error disposing previous game:", error);
        }
      }
      
      try {
        // Create new game instance with fresh state
        this.currentGame = new GameClass(this);
        
        // Start the game if the start method exists
        if (typeof this.currentGame.start === 'function') {
          this.currentGame.start();
        } else {
          console.error("Game does not have a start method");
        }
      } catch (error) {
        console.error("Error starting game:", error);
        this.showGameSelection(); // Fall back to selection screen on error
      }
    }
  
    startSnake() {
      this.startGame(SnakeGame);
    }
  
    startTetris() {
      this.startGame(TetrisGame);
    }
  
    startFlappyBird() {
      this.startGame(FlappyBirdGame);
    }
  
    startTicTacToe() {
      this.startGame(TicTacToeGame);
    }
  }
  
  class SnakeGame {
    constructor(engine) {
      this.engine = engine;
      this.ctx = engine.ctx;
      this.canvas = engine.canvas;
      
      this.gridSize = 20;
      this.tileCount = 20;
      this.snake = [{x: 10, y: 10}];
      this.food = {x: 15, y: 15};
      this.direction = {x: 1, y: 0};
      this.score = 0;
      this.speed = 150; // ms between updates
      this.lastUpdate = 0;
      this.gameStarted = false; // Add flag to track if game has started
      this.isGameOver = false; // Initialize isGameOver flag
      
      // Game assets
      this.assets = {
        background: this.createGradient('#001122', '#003366'),
        snakeHead: this.createGradient('#00FF00', '#00AA00'),
        snakeBody: this.createGradient('#00DD00', '#008800'),
        food: this.createGradient('#FF0000', '#AA0000'),
        grid: 'rgba(255, 255, 255, 0.1)'
      };
      
      // Particles for effects
      this.particles = [];
      
      // Set up controls
      document.addEventListener('keydown', this.handleKeyPress.bind(this));
      
      // Add back button
      this.addBackButton();
      
      // Calculate grid size based on canvas
      this.resize();
      
      // Ensure the game state is properly initialized
      if (this.engine) {
        this.engine.gameEnded = false;
      }
    }
    
    createGradient(color1, color2) {
      const gradient = this.ctx.createRadialGradient(
        this.canvas.width/2, this.canvas.height/2, 0,
        this.canvas.width/2, this.canvas.height/2, this.canvas.width/2
      );
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      return gradient;
    }
    
    resize() {
      // Calculate grid size based on canvas dimensions
      this.gridSize = Math.min(
        this.canvas.width / this.tileCount,
        this.canvas.height / this.tileCount
      );
      
      // Recreate gradients after resize
      this.assets.background = this.createGradient('#001122', '#003366');
      this.assets.snakeHead = this.createGradient('#00FF00', '#00AA00');
      this.assets.snakeBody = this.createGradient('#00DD00', '#008800');
      this.assets.food = this.createGradient('#FF0000', '#AA0000');
    }
    
    addBackButton() {
      const backBtn = document.createElement('button');
      backBtn.textContent = 'Back to Menu';
      backBtn.style.position = 'absolute';
      backBtn.style.top = '10px';
      backBtn.style.left = '10px';
      backBtn.style.zIndex = '100';
      backBtn.style.padding = '5px 10px';
      backBtn.style.backgroundColor = '#149ddd';
      backBtn.style.color = 'white';
      backBtn.style.border = 'none';
      backBtn.style.borderRadius = '5px';
      backBtn.style.cursor = 'pointer';
      
      backBtn.addEventListener('click', () => {
        if (this.engine) {
          this.engine.cleanupAllGames();
          this.engine.showGameSelection();
        }
      });
      
      this.backBtn = backBtn;
      this.canvas.parentElement.appendChild(backBtn);
    }
    
    handleKeyPress(event) {
      // Start the game on space key press
      if (event.code === 'Space' && !this.gameStarted) {
        this.gameStarted = true;
        
        // Make sure gameEnded and isGameOver flags are false when starting
        this.isGameOver = false;
        this.engine.gameEnded = false;
        
        // Hide the prompt during gameplay
        const promptElement = document.getElementById('gamePrompt');
        if (promptElement) {
          promptElement.classList.add('hidden');
        }
        return;
      }
      
      // Only handle direction keys if the game has started
      if (!this.gameStarted) return;
      
      switch(event.key) {
        case 'ArrowUp':
          if (this.direction.y !== 1) {
            this.direction = {x: 0, y: -1};
          }
          break;
        case 'ArrowDown':
          if (this.direction.y !== -1) {
            this.direction = {x: 0, y: 1};
          }
          break;
        case 'ArrowLeft':
          if (this.direction.x !== 1) {
            this.direction = {x: -1, y: 0};
          }
          break;
        case 'ArrowRight':
          if (this.direction.x !== -1) {
            this.direction = {x: 1, y: 0};
          }
          break;
        case 'Escape':
          this.engine.showGameSelection();
          break;
      }
    }
    
    update(timestamp) {
      // Don't update game state if game hasn't started
      if (!this.gameStarted) {
        return;
      }
      
      // Only update at specified intervals
      if (timestamp - this.lastUpdate < this.speed) {
        return;
      }
      this.lastUpdate = timestamp;
      
      // Move snake
      const head = {
        x: this.snake[0].x + this.direction.x,
        y: this.snake[0].y + this.direction.y
      };
      
      // Check wall collision
      if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
        this.gameOver();
        return;
      }
      
      // Check self collision
      for (let i = 0; i < this.snake.length; i++) {
        if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
          this.gameOver();
          return;
        }
      }
      
      this.snake.unshift(head);
      
      // Check food collision
      if (head.x === this.food.x && head.y === this.food.y) {
        // Update local score
        this.score += 10;
        
        // Store score in engine but don't display prompt during gameplay
        if (!this.engine.gameEnded) {
          this.engine.score = this.score;
        }
        
        // Create particles for effect
        this.createFoodParticles();
        
        // Increase speed slightly
        this.speed = Math.max(50, this.speed - 2);
        
        // Generate new food
        this.food = {
          x: Math.floor(Math.random() * this.tileCount),
          y: Math.floor(Math.random() * this.tileCount)
        };
      } else {
        this.snake.pop();
      }
      
      // Update particles
      this.updateParticles();
    }
    
    createFoodParticles() {
      const offsetX = (this.canvas.width - this.tileCount * this.gridSize) / 2;
      const offsetY = (this.canvas.height - this.tileCount * this.gridSize) / 2;
      
      const foodX = offsetX + (this.food.x + 0.5) * this.gridSize;
      const foodY = offsetY + (this.food.y + 0.5) * this.gridSize;
      
      for (let i = 0; i < 20; i++) {
        this.particles.push({
          x: foodX,
          y: foodY,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5,
          size: 2 + Math.random() * 3,
          color: `hsl(${Math.random() * 60 + 330}, 100%, 50%)`,
          life: 30
        });
      }
    }
    
    updateParticles() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        
        if (p.life <= 0) {
          this.particles.splice(i, 1);
        }
      }
    }
    
    draw() {
      // Clear canvas
      this.ctx.fillStyle = this.assets.background;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Calculate offset to center the game
      const offsetX = (this.canvas.width - this.tileCount * this.gridSize) / 2;
      const offsetY = (this.canvas.height - this.tileCount * this.gridSize) / 2;
      
      // Draw grid
      this.ctx.strokeStyle = this.assets.grid;
      this.ctx.lineWidth = 1;
      
      for (let x = 0; x <= this.tileCount; x++) {
        this.ctx.beginPath();
        this.ctx.moveTo(offsetX + x * this.gridSize, offsetY);
        this.ctx.lineTo(offsetX + x * this.gridSize, offsetY + this.tileCount * this.gridSize);
        this.ctx.stroke();
      }
      
      for (let y = 0; y <= this.tileCount; y++) {
        this.ctx.beginPath();
        this.ctx.moveTo(offsetX, offsetY + y * this.gridSize);
        this.ctx.lineTo(offsetX + this.tileCount * this.gridSize, offsetY + y * this.gridSize);
        this.ctx.stroke();
      }
      
      // Draw snake
      for (let i = 0; i < this.snake.length; i++) {
        const segment = this.snake[i];
        
        // Use different color for head
        this.ctx.fillStyle = i === 0 ? this.assets.snakeHead : this.assets.snakeBody;
        
        // Draw rounded rectangle for snake segments
        const x = offsetX + segment.x * this.gridSize;
        const y = offsetY + segment.y * this.gridSize;
        const size = this.gridSize - 2;
        const radius = size / 4;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.arcTo(x + size, y, x + size, y + size, radius);
        this.ctx.arcTo(x + size, y + size, x, y + size, radius);
        this.ctx.arcTo(x, y + size, x, y, radius);
        this.ctx.arcTo(x, y, x + size, y, radius);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Draw eyes on head
        if (i === 0) {
          this.ctx.fillStyle = 'white';
          
          // Position eyes based on direction
          let eyeX1, eyeY1, eyeX2, eyeY2;
          
          if (this.direction.x === 1) { // Right
            eyeX1 = x + size * 0.7;
            eyeY1 = y + size * 0.3;
            eyeX2 = x + size * 0.7;
            eyeY2 = y + size * 0.7;
          } else if (this.direction.x === -1) { // Left
            eyeX1 = x + size * 0.3;
            eyeY1 = y + size * 0.3;
            eyeX2 = x + size * 0.3;
            eyeY2 = y + size * 0.7;
          } else if (this.direction.y === -1) { // Up
            eyeX1 = x + size * 0.3;
            eyeY1 = y + size * 0.3;
            eyeX2 = x + size * 0.7;
            eyeY2 = y + size * 0.3;
          } else { // Down
            eyeX1 = x + size * 0.3;
            eyeY1 = y + size * 0.7;
            eyeX2 = x + size * 0.7;
            eyeY2 = y + size * 0.7;
          }
          
          const eyeSize = size * 0.15;
          this.ctx.beginPath();
          this.ctx.arc(eyeX1, eyeY1, eyeSize, 0, Math.PI * 2);
          this.ctx.fill();
          
          this.ctx.beginPath();
          this.ctx.arc(eyeX2, eyeY2, eyeSize, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
      
      // Draw food
      this.ctx.fillStyle = this.assets.food;
      const foodX = offsetX + this.food.x * this.gridSize;
      const foodY = offsetY + this.food.y * this.gridSize;
      const foodSize = this.gridSize - 2;
      
      this.ctx.beginPath();
      this.ctx.arc(foodX + foodSize/2, foodY + foodSize/2, foodSize/2, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw stem
      this.ctx.fillStyle = '#00AA00';
      this.ctx.fillRect(foodX + foodSize/2 - 2, foodY, 4, 5);
      
      // Draw particles
      for (const p of this.particles) {
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.life / 30;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.globalAlpha = 1;
      
      // Draw score
      this.ctx.fillStyle = 'white';
      this.ctx.font = '20px Arial';
      this.ctx.textAlign = 'left';
      this.ctx.fillText(`Score: ${this.score}`, 10, 30);
      
      // Show "Press Space to Start" message if game hasn't started
      if (!this.gameStarted) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = '30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Press SPACE to Start', this.canvas.width / 2, this.canvas.height / 2);
      }
    }
    
    gameOver() {
      this.isGameOver = true;
      this.engine.gameEnded = true;
      
      // Update the final score in the engine
      this.engine.updateScore(this.score);
      
      // Ensure the game prompt is shown with the final score
      const promptElement = document.getElementById('gamePrompt');
      if (promptElement && this.score>0) {
        promptElement.textContent = `Game Over! Final Score: ${this.score}`;
        promptElement.classList.remove('hidden');
      }

      // Add back button after a short delay
      setTimeout(() => {
        this.addBackButton();
      }, 1000);
      
      // Dispose the game immediately after game over
      this.dispose();
    }
    
    dispose() {
      this.disposed = true;
      document.removeEventListener('keydown', this.handleKeyPress);
      if (this.backBtn && this.backBtn.parentNode) {
        this.backBtn.parentNode.removeChild(this.backBtn);
      }
      
      // Cancel any pending animation frames
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }
    
    start() {
      this.disposed = false;
      this.isGameOver = false;
      
      // Make sure engine state is clean
      if (this.engine) {
        this.engine.gameEnded = false;
      }
      
      const gameLoop = (timestamp) => {
        if (this.disposed) return;
        
        this.update(timestamp);
        this.draw();
        
        if (!this.disposed) {
          this.animationFrameId = requestAnimationFrame(gameLoop);
        }
      };
      
      this.animationFrameId = requestAnimationFrame(gameLoop);
    }
  }
  
  class TetrisGame {
    constructor(engine) {
      this.engine = engine;
      this.ctx = engine.ctx;
      this.canvas = engine.canvas;
      
      // Game state
      this.score = 0;
      this.level = 1;
      this.lines = 0;
      this.gameOver = false;
      this.gameStarted = false; // Add flag to track if game has started
      
      // Grid dimensions
      this.cols = 10;
      this.rows = 20;
      this.cellSize = 30;
      
      // Game board
      this.board = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
      
      // Current piece
      this.currentPiece = null;
      this.nextPiece = null;
      
      // Game timing
      this.dropInterval = 1000;
      this.lastDrop = 0;
      
      // Piece definitions
      this.pieces = [
        { shape: [[1,1,1,1]], color: '#00FFFF' }, // I
        { shape: [[1,1],[1,1]], color: '#FFFF00' }, // O
        { shape: [[1,1,1],[0,1,0]], color: '#800080' }, // T
        { shape: [[1,1,1],[1,0,0]], color: '#FFA500' }, // L
        { shape: [[1,1,1],[0,0,1]], color: '#0000FF' }, // J
        { shape: [[1,1,0],[0,1,1]], color: '#00FF00' }, // S
        { shape: [[0,1,1],[1,1,0]], color: '#FF0000' }  // Z
      ];
      
      // Particles for effects
      this.particles = [];
      
      // Set up controls
      document.addEventListener('keydown', this.handleKeyPress.bind(this));
      
      // Add back button
      this.addBackButton();
      
      // Initialize game
      this.resize();
      this.generatePiece();
    }
    
    resize() {
      // Calculate cell size based on canvas dimensions
      this.cellSize = Math.min(
        (this.canvas.width * 0.6) / this.cols,
        (this.canvas.height * 0.9) / this.rows
      );
      
      // Calculate board position
      this.boardX = (this.canvas.width - this.cols * this.cellSize) / 2;
      this.boardY = (this.canvas.height - this.rows * this.cellSize) / 2;
    }
    
    addBackButton() {
      const backBtn = document.createElement('button');
      backBtn.textContent = 'Back to Menu';
      backBtn.style.position = 'absolute';
      backBtn.style.top = '10px';
      backBtn.style.left = '10px';
      backBtn.style.zIndex = '100';
      backBtn.style.padding = '5px 10px';
      backBtn.style.backgroundColor = '#149ddd';
      backBtn.style.color = 'white';
      backBtn.style.border = 'none';
      backBtn.style.borderRadius = '5px';
      backBtn.style.cursor = 'pointer';
      
      backBtn.addEventListener('click', () => {
        if (this.engine) {
          this.engine.cleanupAllGames();
          this.engine.showGameSelection();
        }
      });
      
      this.backBtn = backBtn;
      this.canvas.parentElement.appendChild(backBtn);
    }
    
    generatePiece() {
      if (!this.nextPiece) {
        this.nextPiece = {
          ...this.pieces[Math.floor(Math.random() * this.pieces.length)],
          x: Math.floor(this.cols / 2) - 1,
          y: this.rows - 1
        };
      }
      
      this.currentPiece = this.nextPiece;
      
      // Generate next piece
      this.nextPiece = {
        ...this.pieces[Math.floor(Math.random() * this.pieces.length)],
        x: Math.floor(this.cols / 2) - 1,
        y: this.rows - 1
      };
      
      // Check if game over
      if (this.checkCollision()) {
        this.gameOver = true;
        alert(`Game Over! Score: ${this.score}`);
        this.resetGame();
      }
    }
    
    resetGame() {
      this.board = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
      this.score = 0;
      this.level = 1;
      this.lines = 0;
      this.gameOver = false;
      this.dropInterval = 1000;
      this.engine.updateScore(0);
      this.generatePiece();
    }
    
    handleKeyPress(event) {
      // Start the game on space key press
      if (event.code === 'Space' && !this.gameStarted) {
        this.gameStarted = true;
        const promptElement = document.getElementById('gamePrompt');
        if (promptElement) {
          promptElement.classList.add('hidden');
        }
        return;
      }
      
      if (this.gameOver || !this.gameStarted) return;
      
      switch(event.key) {
        case 'ArrowLeft':
          this.movePiece(-1, 0);
          break;
        case 'ArrowRight':
          this.movePiece(1, 0);
          break;
        case 'ArrowDown':
          this.movePiece(0, -1);
          break;
        case 'ArrowUp':
          this.rotatePiece();
          break;
        case ' ':
          this.hardDrop();
          break;
        case 'Escape':
          this.engine.showGameSelection();
          break;
      }
    }
    
    movePiece(dx, dy) {
      this.currentPiece.x += dx;
      this.currentPiece.y += dy;
      
      if (this.checkCollision()) {
        this.currentPiece.x -= dx;
        this.currentPiece.y -= dy;
        
        if (dy < 0) {
          this.lockPiece();
          this.clearLines();
          this.generatePiece();
        }
      }
    }
    
    rotatePiece() {
      const originalShape = this.currentPiece.shape;
      
      // Create a new rotated shape (transpose and reverse)
      const rotatedShape = [];
      for (let i = 0; i < originalShape[0].length; i++) {
        const newRow = [];
        for (let j = originalShape.length - 1; j >= 0; j--) {
          newRow.push(originalShape[j][i] || 0);
        }
        rotatedShape.push(newRow);
      }
      
      // Save original shape
      const originalPiece = {...this.currentPiece};
      
      // Try rotation
      this.currentPiece.shape = rotatedShape;
      
      // If collision, revert
      if (this.checkCollision()) {
        this.currentPiece = originalPiece;
      }
    }
    
    hardDrop() {
      while (!this.checkCollision()) {
        this.currentPiece.y--;
      }
      
      this.currentPiece.y++; // Move back up one
      this.lockPiece();
      this.clearLines();
      this.generatePiece();
    }
    
    checkCollision() {
      const { shape, x, y } = this.currentPiece;
      
      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col]) {
            const boardX = x + col;
            const boardY = y - row;
            
            // Check boundaries
            if (boardX < 0 || boardX >= this.cols || boardY < 0 || boardY >= this.rows) {
              return true;
            }
            
            // Check collision with locked pieces
            if (this.board[boardY][boardX]) {
              return true;
            }
          }
        }
      }
      
      return false;
    }
    
    lockPiece() {
      const { shape, x, y, color } = this.currentPiece;
      
      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col]) {
            const boardX = x + col;
            const boardY = y - row;
            
            if (boardY >= 0 && boardY < this.rows && boardX >= 0 && boardX < this.cols) {
              this.board[boardY][boardX] = color;
            }
          }
        }
      }
    }
    
    clearLines() {
      let linesCleared = 0;
      
      for (let y = 0; y < this.rows; y++) {
        if (this.board[y].every(cell => cell !== 0)) {
          // Create particles for effect
          this.createLineParticles(y);
          
          // Remove the line
          this.board.splice(y, 1);
          this.board.push(Array(this.cols).fill(0));
          
          linesCleared++;
          y--; // Check the same row again
        }
      }
      
      if (linesCleared > 0) {
        // Update score
        const points = [0, 40, 100, 300, 1200][linesCleared] * (this.level + 1);
        this.score += points;
        this.lines += linesCleared;
        this.level = Math.floor(this.lines / 10) + 1;
        this.dropInterval = Math.max(100, 1000 - (this.level - 1) * 100);
        
        this.engine.updateScore(this.score);
      }
    }
    
    createLineParticles(lineY) {
      for (let x = 0; x < this.cols; x++) {
        const screenX = this.boardX + (x + 0.5) * this.cellSize;
        const screenY = this.boardY + (this.rows - lineY - 0.5) * this.cellSize;
        
        for (let i = 0; i < 5; i++) {
          this.particles.push({
            x: screenX,
            y: screenY,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.5) * 5,
            size: 2 + Math.random() * 3,
            color: this.board[lineY][x],
            life: 30
          });
        }
      }
    }
    
    updateParticles() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        
        if (p.life <= 0) {
          this.particles.splice(i, 1);
        }
      }
    }
    
    update(timestamp) {
      if (this.gameOver || !this.gameStarted) return;
      
      // Handle automatic piece drop
      if (timestamp - this.lastDrop > this.dropInterval) {
        this.movePiece(0, -1);
        this.lastDrop = timestamp;
      }
      
      // Update particles
      this.updateParticles();
    }
    
    draw() {
      // Clear canvas with gradient background
      const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
      gradient.addColorStop(0, '#000033');
      gradient.addColorStop(1, '#000066');
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Draw board background
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(
        this.boardX, 
        this.boardY, 
        this.cols * this.cellSize, 
        this.rows * this.cellSize
      );
      
      // Draw grid
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      this.ctx.lineWidth = 1;
      
      // Vertical lines
      for (let x = 0; x <= this.cols; x++) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.boardX + x * this.cellSize, this.boardY);
        this.ctx.lineTo(this.boardX + x * this.cellSize, this.boardY + this.rows * this.cellSize);
        this.ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y <= this.rows; y++) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.boardX, this.boardY + y * this.cellSize);
        this.ctx.lineTo(this.boardX + this.cols * this.cellSize, this.boardY + y * this.cellSize);
        this.ctx.stroke();
      }
      
      // Draw locked pieces
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          if (this.board[y][x]) {
            this.drawBlock(x, this.rows - y - 1, this.board[y][x]);
          }
        }
      }
      
      // Draw current piece
      if (this.currentPiece) {
        const { shape, x, y, color } = this.currentPiece;
        
        for (let row = 0; row < shape.length; row++) {
          for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
              this.drawBlock(
                x + col, 
                this.rows - (y - row) - 1, 
                color
              );
            }
          }
        }
      }
      
      // Draw particles
      for (const p of this.particles) {
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.life / 30;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.globalAlpha = 1;
      
      // Draw score
      this.ctx.fillStyle = 'white';
      this.ctx.font = '20px Arial';
      this.ctx.textAlign = 'left';
      this.ctx.fillText(`Score: ${this.score}`, 10, 30);
      
      // Show "Press Space to Start" message if game hasn't started
      if (!this.gameStarted) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = '30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Press SPACE to Start', this.canvas.width / 2, this.canvas.height / 2);
      }
    }
    
    drawBlock(x, y, color) {
      const blockX = this.boardX + x * this.cellSize;
      const blockY = this.boardY + y * this.cellSize;
      
      // Draw main block
      this.ctx.fillStyle = color;
      this.ctx.fillRect(
        blockX + 1,
        blockY + 1,
        this.cellSize - 2,
        this.cellSize - 2
      );
      
      // Draw highlight (top and left edges)
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      this.ctx.fillRect(
        blockX + 1,
        blockY + 1,
        this.cellSize - 2,
        this.cellSize / 4
      );
      this.ctx.fillRect(
        blockX + 1,
        blockY + 1,
        this.cellSize / 4,
        this.cellSize - 2
      );
      
      // Draw shadow (bottom and right edges)
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      this.ctx.fillRect(
        blockX + 1,
        blockY + this.cellSize - this.cellSize / 4,
        this.cellSize - 2,
        this.cellSize / 4 - 1
      );
      this.ctx.fillRect(
        blockX + this.cellSize - this.cellSize / 4,
        blockY + 1,
        this.cellSize / 4 - 1,
        this.cellSize - 2
      );
    }
    
    dispose() {
      this.disposed = true;
      document.removeEventListener('keydown', this.handleKeyPress);
      if (this.backBtn && this.backBtn.parentNode) {
        this.backBtn.parentNode.removeChild(this.backBtn);
      }
      
      // Cancel any pending animation frames
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }
    
    start() {
      this.disposed = false;
      
      const gameLoop = (timestamp) => {
        if (this.disposed) return;
        
        this.update(timestamp);
        this.draw();
        
        if (!this.disposed) {
          this.animationFrameId = requestAnimationFrame(gameLoop);
        }
      };
      
      this.animationFrameId = requestAnimationFrame(gameLoop);
    }
  }
  
  class FlappyBirdGame {
    constructor(engine) {
      this.engine = engine;
      this.ctx = engine.ctx;
      this.canvas = engine.canvas;
      
      // Game state
      this.score = 0;
      this.gameOver = false;
      this.gameStarted = false; // Add flag to track if game has started
      this.disposed = false;
      this.animationFrameId = null;
      
      // Bird properties
      this.birdX = this.canvas.width / 3;
      this.birdY = this.canvas.height / 2;
      this.birdSize = 20;
      this.birdVelocity = 0;
      this.gravity = 0.5;
      this.flapStrength = -10;
      
      // Bird colors
      this.birdColors = {
        body: '#FFC107', // Amber
        wing: '#FF9800', // Orange
        eye: 'white',
        pupil: 'black',
        beak: '#FF5722' // Deep Orange
      };
      
      // Pipe properties
      this.pipes = [];
      this.pipeWidth = 80;
      this.pipeGap = 150;
      this.pipeSpacing = 300;
      this.pipeSpeed = 5;
      this.minPipeHeight = 50;
      
      // Pipe colors
      this.pipeColors = {
        main: '#4CAF50', // Green
        highlight: '#81C784', // Light Green
        shadow: '#2E7D32', // Dark Green
        cap: '#388E3C' // Medium Green
      };
      
      // Animation properties
      this.birdRotation = 0;
      this.wingAngle = 0;
      this.wingDirection = 1;
      
      // Particles
      this.particles = [];
      
      // Background layers for parallax
      this.backgroundLayers = [
        { img: this.createStarsImage(), x: 0, speed: 0.1 },
        { img: this.createCloudImage(), x: 0, speed: 0.5 },
        { img: this.createCloudImage(), x: this.canvas.width, speed: 0.5 },
        { img: this.createMountainImage(), x: 0, speed: 1 },
        { img: this.createMountainImage(), x: this.canvas.width, speed: 1 }
      ];
      
      // Set up controls
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.handleClick = this.handleClick.bind(this);
      document.addEventListener('keydown', this.handleKeyPress);
      this.canvas.addEventListener('click', this.handleClick);
      
      // Add back button
      this.addBackButton();
      
      // Initialize game
      this.resize();
      this.spawnPipe();
    }
    
    createStarsImage() {
      const starsCanvas = document.createElement('canvas');
      starsCanvas.width = this.canvas.width;
      starsCanvas.height = this.canvas.height;
      const ctx = starsCanvas.getContext('2d');
      
      // Draw stars
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * starsCanvas.width;
        const y = Math.random() * starsCanvas.height / 2; // Only in top half
        const size = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.8 + 0.2;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      return starsCanvas;
    }
    
    createCloudImage() {
      const cloudCanvas = document.createElement('canvas');
      cloudCanvas.width = this.canvas.width;
      cloudCanvas.height = 100;
      const ctx = cloudCanvas.getContext('2d');
      
      // Draw clouds with modern gradient
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * cloudCanvas.width;
        const y = Math.random() * 50;
        const radius = 20 + Math.random() * 30;
        
        const gradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, radius
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x + 20, y + 10, radius * 0.8, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x - 20, y + 10, radius * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
      
      return cloudCanvas;
    }
    
    createMountainImage() {
      const mountainCanvas = document.createElement('canvas');
      mountainCanvas.width = this.canvas.width;
      mountainCanvas.height = 200;
      const ctx = mountainCanvas.getContext('2d');
      
      // Draw mountains with modern gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, mountainCanvas.height);
      gradient.addColorStop(0, '#3F51B5'); // Indigo
      gradient.addColorStop(1, '#303F9F'); // Dark Indigo
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, mountainCanvas.height);
      
      // Create more natural looking mountains
      let x = 0;
      while (x < mountainCanvas.width) {
        const height = Math.random() * 150 + 50;
        const width = Math.random() * 100 + 50;
        
        // Draw a mountain peak
        ctx.lineTo(x + width/2, mountainCanvas.height - height);
        ctx.lineTo(x + width, mountainCanvas.height);
        
        x += width;
      }
      
      ctx.closePath();
      ctx.fill();
      
      // Add snow caps
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.moveTo(0, mountainCanvas.height);
      
      x = 0;
      while (x < mountainCanvas.width) {
        const height = Math.random() * 150 + 50;
        const width = Math.random() * 100 + 50;
        
        // Draw snow only on top 20% of mountains
        const snowHeight = mountainCanvas.height - height;
        const snowCapHeight = height * 0.2;
        
        ctx.lineTo(x + width/2, snowHeight);
        ctx.lineTo(x + width/2 + 10, snowHeight + snowCapHeight);
        ctx.lineTo(x + width - 10, snowHeight + snowCapHeight);
        ctx.lineTo(x + width, snowHeight);
        
        x += width;
      }
      
      ctx.closePath();
      ctx.fill();
      
      return mountainCanvas;
    }
    
    resize() {
      // Adjust bird position and pipe dimensions based on canvas size
      this.birdX = this.canvas.width / 3;
      this.birdSize = Math.min(30, this.canvas.width / 20);
      this.pipeWidth = Math.min(80, this.canvas.width / 8);
      this.pipeGap = Math.min(150, this.canvas.height / 3);
      this.pipeSpacing = Math.min(300, this.canvas.width / 2);
      
      // Recreate background layers
      this.backgroundLayers = [
        { img: this.createStarsImage(), x: 0, speed: 0.1 },
        { img: this.createCloudImage(), x: 0, speed: 0.5 },
        { img: this.createCloudImage(), x: this.canvas.width, speed: 0.5 },
        { img: this.createMountainImage(), x: 0, speed: 1 },
        { img: this.createMountainImage(), x: this.canvas.width, speed: 1 }
      ];
    }
    
    addBackButton() {
      const backBtn = document.createElement('button');
      backBtn.textContent = 'Back to Menu';
      backBtn.style.position = 'absolute';
      backBtn.style.top = '10px';
      backBtn.style.left = '10px';
      backBtn.style.zIndex = '100';
      backBtn.style.padding = '5px 10px';
      backBtn.style.backgroundColor = '#149ddd';
      backBtn.style.color = 'white';
      backBtn.style.border = 'none';
      backBtn.style.borderRadius = '5px';
      backBtn.style.cursor = 'pointer';
      
      backBtn.addEventListener('click', () => {
        if (this.engine) {
          this.engine.cleanupAllGames();
          this.engine.showGameSelection();
        }
      });
      
      this.backBtn = backBtn;
      this.canvas.parentElement.appendChild(backBtn);
    }
    
    handleKeyPress(event) {
      if (event.code === 'Space') {
        if (!this.gameStarted) {
          this.gameStarted = true;
          const promptElement = document.getElementById('gamePrompt');
          if (promptElement) {
            promptElement.classList.add('hidden');
          }
        } else {
          this.flap();
        }
      } else if (event.key === 'Escape') {
        this.engine.showGameSelection();
      }
    }
    
    handleClick() {
      if (!this.gameStarted) {
        this.gameStarted = true;
        const promptElement = document.getElementById('gamePrompt');
        if (promptElement) {
          promptElement.classList.add('hidden');
        }
      } else {
        this.flap();
      }
    }
    
    flap() {
      if (this.gameOver) {
        this.resetGame();
        return;
      }
      
      this.birdVelocity = this.flapStrength;
      this.birdRotation = -30 * Math.PI / 180; // Rotate up
      
      // Create particles for wing flap
      for (let i = 0; i < 10; i++) {
        this.particles.push({
          x: this.birdX - this.birdSize / 2,
          y: this.birdY,
          vx: -Math.random() * 3 - 1,
          vy: (Math.random() - 0.5) * 2,
          size: 2 + Math.random() * 3,
          color: this.birdColors.wing,
          life: 20
        });
      }
    }
    
    spawnPipe() {
      const availableHeight = this.canvas.height - this.minPipeHeight * 2 - this.pipeGap;
      const topHeight = Math.random() * availableHeight + this.minPipeHeight;
      
      this.pipes.push({
        x: this.canvas.width,
        topHeight: topHeight,
        bottomY: topHeight + this.pipeGap,
        counted: false
      });
    }
    
    updateParticles() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        
        if (p.life <= 0) {
          this.particles.splice(i, 1);
        }
      }
    }
    
    update() {
      if (this.gameOver || !this.gameStarted) return;
      
      // Update bird
      this.birdVelocity += this.gravity;
      this.birdY += this.birdVelocity;
      
      // Update bird rotation based on velocity
      const targetRotation = this.birdVelocity > 0 ? 
        Math.min(90 * Math.PI / 180, this.birdVelocity * 0.05) : 
        -30 * Math.PI / 180;
      this.birdRotation += (targetRotation - this.birdRotation) * 0.1;
      
      // Update wing animation
      this.wingAngle += 0.2 * this.wingDirection;
      if (this.wingAngle > 30 || this.wingAngle < -30) {
        this.wingDirection *= -1;
      }
      
      // Update pipes
      for (let i = this.pipes.length - 1; i >= 0; i--) {
        const pipe = this.pipes[i];
        pipe.x -= this.pipeSpeed;
        
        // Check if pipe is passed
        if (!pipe.counted && pipe.x + this.pipeWidth < this.birdX) {
          this.score++;
          this.engine.updateScore(this.score);
          pipe.counted = true;
          
          // Increase difficulty
          if (this.score % 5 === 0) {
            this.pipeSpeed += 0.5;
          }
        }
        
        // Remove off-screen pipes
        if (pipe.x + this.pipeWidth < 0) {
          this.pipes.splice(i, 1);
        }
      }
      
      // Spawn new pipes
      if (this.pipes.length === 0 || 
          this.pipes[this.pipes.length - 1].x < this.canvas.width - this.pipeSpacing) {
        this.spawnPipe();
      }
      
      // Update background layers if game has started
      for (const layer of this.backgroundLayers) {
        layer.x -= layer.speed;
        if (layer.x <= -this.canvas.width) {
          layer.x = this.canvas.width;
        }
      }
      
      // Update particles
      this.updateParticles();
      
      // Check collisions
      this.checkCollisions();
    }
    
    checkCollisions() {
      // Check floor and ceiling
      if (this.birdY + this.birdSize / 2 > this.canvas.height || 
          this.birdY - this.birdSize / 2 < 0) {
        this.gameOver = true;
        return;
      }
      
      // Check pipe collisions
      for (const pipe of this.pipes) {
        // Check if bird is horizontally aligned with pipe
        if (this.birdX + this.birdSize / 2 > pipe.x && 
            this.birdX - this.birdSize / 2 < pipe.x + this.pipeWidth) {
          
          // Check if bird is in the gap
          if (this.birdY - this.birdSize / 2 < pipe.topHeight || 
              this.birdY + this.birdSize / 2 > pipe.bottomY) {
            this.gameOver = true;
            return;
          }
        }
      }
    }
    
    draw() {
      // Draw sky gradient background
      const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
      gradient.addColorStop(0, '#1A237E'); // Dark Indigo
      gradient.addColorStop(0.5, '#3949AB'); // Indigo
      gradient.addColorStop(1, '#5C6BC0'); // Light Indigo
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Draw background layers
      for (const layer of this.backgroundLayers) {
        this.ctx.drawImage(layer.img, layer.x, this.canvas.height - layer.img.height);
      }
      
      // Draw pipes with modern style
      for (const pipe of this.pipes) {
        // Top pipe
        this.drawModernPipe(pipe.x, 0, this.pipeWidth, pipe.topHeight, 'bottom');
        
        // Bottom pipe
        this.drawModernPipe(pipe.x, pipe.bottomY, this.pipeWidth, this.canvas.height - pipe.bottomY, 'top');
      }
      
      // Draw bird with modern style
      this.drawModernBird(this.birdX, this.birdY, this.birdSize, this.birdRotation, this.wingAngle);
      
      // Draw particles
      for (const p of this.particles) {
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.life / 20;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.globalAlpha = 1;
      
      // Draw score with shadow
      this.ctx.fillStyle = 'white';
      this.ctx.font = 'bold 30px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      this.ctx.shadowBlur = 5;
      this.ctx.shadowOffsetX = 2;
      this.ctx.shadowOffsetY = 2;
      this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, 50);
      this.ctx.shadowColor = 'transparent';
      
      // Show "Press Space to Start" message if game hasn't started
      if (!this.gameStarted) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = '30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Press SPACE to Start', this.canvas.width / 2, this.canvas.height / 2);
      }
      
      // Draw game over message
      if (this.gameOver) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 40px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2 - 40);
        this.ctx.font = 'bold 30px Arial';
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.font = '20px Arial';
        this.ctx.fillText('Click or press Space to play again', this.canvas.width / 2, this.canvas.height / 2 + 40);
      }
    }
    
    drawModernPipe(x, y, width, height, capPosition) {
      // Main pipe body
      const gradient = this.ctx.createLinearGradient(x, y, x + width, y);
      gradient.addColorStop(0, this.pipeColors.shadow);
      gradient.addColorStop(0.3, this.pipeColors.main);
      gradient.addColorStop(0.7, this.pipeColors.main);
      gradient.addColorStop(1, this.pipeColors.highlight);
      
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(x, y, width, height);
      
      // Pipe cap
      const capHeight = Math.min(20, height * 0.1);
      const capWidth = width * 1.2;
      const capX = x - (capWidth - width) / 2;
      
      let capY;
      if (capPosition === 'top') {
        capY = y;
      } else { // bottom
        capY = y + height - capHeight;
      }
      
      const capGradient = this.ctx.createLinearGradient(capX, capY, capX + capWidth, capY);
      capGradient.addColorStop(0, this.pipeColors.shadow);
      capGradient.addColorStop(0.3, this.pipeColors.cap);
      capGradient.addColorStop(0.7, this.pipeColors.cap);
      capGradient.addColorStop(1, this.pipeColors.highlight);
      
      this.ctx.fillStyle = capGradient;
      this.ctx.fillRect(capX, capY, capWidth, capHeight);
      
      // Add pipe details
      this.ctx.strokeStyle = this.pipeColors.shadow;
      this.ctx.lineWidth = 2;
      
      // Horizontal lines on pipe
      const lineSpacing = Math.min(30, height / 5);
      let lineY = capPosition === 'top' ? y + capHeight + lineSpacing : y + lineSpacing;
      const endY = capPosition === 'top' ? y + height : y + height - capHeight;
      
      while (lineY < endY) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + 5, lineY);
        this.ctx.lineTo(x + width - 5, lineY);
        this.ctx.stroke();
        lineY += lineSpacing;
      }
    }
    
    drawModernBird(x, y, size, rotation, wingAngle) {
      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.rotate(rotation);
      
      // Bird body
      const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      gradient.addColorStop(0, this.birdColors.body);
      gradient.addColorStop(1, this.birdColors.body);
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, size, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Wing
      this.ctx.fillStyle = this.birdColors.wing;
      this.ctx.save();
      this.ctx.rotate(wingAngle * Math.PI / 180);
      this.ctx.beginPath();
      this.ctx.ellipse(-size/4, 0, size/2, size/4, 0, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
      
      // Eye
      this.ctx.fillStyle = this.birdColors.eye;
      this.ctx.beginPath();
      this.ctx.arc(size/2, -size/4, size/4, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Pupil
      this.ctx.fillStyle = this.birdColors.pupil;
      this.ctx.beginPath();
      this.ctx.arc(size/2 + size/8, -size/4, size/8, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Beak
      this.ctx.fillStyle = this.birdColors.beak;
      this.ctx.beginPath();
      this.ctx.moveTo(size, 0);
      this.ctx.lineTo(size * 1.5, -size/4);
      this.ctx.lineTo(size * 1.5, size/4);
      this.ctx.closePath();
      this.ctx.fill();
      
      this.ctx.restore();
    }
    
    resetGame() {
      this.score = 0;
      this.gameOver = false;
      this.birdY = this.canvas.height / 2;
      this.birdVelocity = 0;
      this.pipes = [];
      this.spawnPipe();
    }
    
    dispose() {
      console.log("Disposing Flappy Bird game");
      this.disposed = true;
      document.removeEventListener('keydown', this.handleKeyPress);
      this.canvas.removeEventListener('click', this.handleClick);
      if (this.backBtn && this.backBtn.parentNode) {
        this.backBtn.parentNode.removeChild(this.backBtn);
      }
      
      // Cancel any pending animation frames
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }
  
    start() {
      this.disposed = false;
      
      const gameLoop = (timestamp) => {
        if (this.disposed) return;
        
        this.update();
        this.draw();
        
        if (!this.disposed) {
          this.animationFrameId = requestAnimationFrame(gameLoop);
        }
      };
      
      this.animationFrameId = requestAnimationFrame(gameLoop);
    }
  }
  
  class TicTacToeGame {
    constructor(engine) {
      this.engine = engine;
      this.ctx = engine.ctx;
      this.canvas = engine.canvas;
      
      // Game state
      this.score = 0;
      this.gameOver = false;
      this.disposed = false;
      this.animationFrameId = null;
      this.currentPlayer = 'X';
      this.winLine = null;
      
      // Game board (3x3 grid)
      this.board = Array(9).fill(null);
      
      // Animation properties
      this.animations = [];
      
      // Set up controls
      this.handleClick = this.handleClick.bind(this);
      this.canvas.addEventListener('click', this.handleClick);
      
      // Add back button
      this.addBackButton();
      
      // Initialize game
      this.resize();
    }
    
    resize() {
      // Calculate cell size based on canvas dimensions
      this.cellSize = Math.min(
        this.canvas.width / 5,
        this.canvas.height / 5
      );
      
      // Calculate board position
      this.boardSize = this.cellSize * 3;
      this.boardX = (this.canvas.width - this.boardSize) / 2;
      this.boardY = (this.canvas.height - this.boardSize) / 2;
    }
    
    addBackButton() {
      const backBtn = document.createElement('button');
      backBtn.textContent = 'Back to Menu';
      backBtn.style.position = 'absolute';
      backBtn.style.top = '10px';
      backBtn.style.left = '10px';
      backBtn.style.zIndex = '100';
      backBtn.style.padding = '5px 10px';
      backBtn.style.backgroundColor = '#149ddd';
      backBtn.style.color = 'white';
      backBtn.style.border = 'none';
      backBtn.style.borderRadius = '5px';
      backBtn.style.cursor = 'pointer';
      
      backBtn.addEventListener('click', () => {
        if (this.engine) {
          this.engine.cleanupAllGames();
          this.engine.showGameSelection();
        }
      });
      
      this.backBtn = backBtn;
      this.canvas.parentElement.appendChild(backBtn);
    }
    
    handleClick(event) {
      if (this.gameOver) {
        this.resetGame();
        return;
      }
      
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Check if click is within the board
      if (x < this.boardX || x > this.boardX + this.boardSize ||
          y < this.boardY || y > this.boardY + this.boardSize) {
        return;
      }
      
      // Calculate cell index
      const cellX = Math.floor((x - this.boardX) / this.cellSize);
      const cellY = Math.floor((y - this.boardY) / this.cellSize);
      const index = cellY * 3 + cellX;
      
      // Make move if cell is empty
      if (this.board[index] === null) {
        this.makeMove(index);
      }
    }
    
    makeMove(index) {
      this.board[index] = this.currentPlayer;
      
      // Add animation for the move
      const cellX = this.boardX + (index % 3) * this.cellSize + this.cellSize / 2;
      const cellY = this.boardY + Math.floor(index / 3) * this.cellSize + this.cellSize / 2;
      
      if (this.currentPlayer === 'X') {
        this.addXAnimation(cellX, cellY);
      } else {
        this.addOAnimation(cellX, cellY);
      }
      
      // Check for win
      const winner = this.checkWin();
      if (winner) {
        this.gameOver = true;
        this.drawWinLine();
        this.score += 1;
        this.engine.updateScore(this.score);
        return;
      }
      
      // Check for draw
      if (this.board.every(cell => cell !== null)) {
        this.gameOver = true;
        return;
      }
      
      // Switch player
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
    
    addXAnimation(x, y) {
      const size = this.cellSize * 0.8 / 2;
      const duration = 20;
      
      this.animations.push({
        type: 'X',
        x: x,
        y: y,
        size: size,
        progress: 0,
        duration: duration,
        update: function() {
          this.progress++;
          return this.progress < this.duration;
        }
      });
    }
    
    addOAnimation(x, y) {
      const radius = this.cellSize * 0.8 / 2;
      const duration = 30;
      
      this.animations.push({
        type: 'O',
        x: x,
        y: y,
        radius: radius,
        progress: 0,
        duration: duration,
        update: function() {
          this.progress++;
          return this.progress < this.duration;
        }
      });
    }
    
    checkWin() {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
      ];
      
      for (const line of lines) {
        const [a, b, c] = line;
        if (this.board[a] &&
            this.board[a] === this.board[b] &&
            this.board[a] === this.board[c]) {
          this.winLine = line;
          return this.board[a];
        }
      }
      
      return null;
    }
    
    drawWinLine() {
      if (!this.winLine) return;
      
      const [a, b, c] = this.winLine;
      const startX = this.boardX + (a % 3) * this.cellSize + this.cellSize / 2;
      const startY = this.boardY + Math.floor(a / 3) * this.cellSize + this.cellSize / 2;
      const endX = this.boardX + (c % 3) * this.cellSize + this.cellSize / 2;
      const endY = this.boardY + Math.floor(c / 3) * this.cellSize + this.cellSize / 2;
      
      const duration = 30;
      
      this.animations.push({
        type: 'line',
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        progress: 0,
        duration: duration,
        color: this.currentPlayer === 'X' ? '#ff5252' : '#2196f3',
        update: function() {
          this.progress++;
          return this.progress < this.duration;
        }
      });
    }
    
    update() {
      // Update animations
      for (let i = this.animations.length - 1; i >= 0; i--) {
        const anim = this.animations[i];
        const active = anim.update();
        
        if (!active) {
          this.animations.splice(i, 1);
        }
      }
    }
    
    draw() {
      // Clear canvas with gradient background
      const gradient = this.ctx.createRadialGradient(
        this.canvas.width / 2, this.canvas.height / 2, 0,
        this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 2
      );
      gradient.addColorStop(0, '#303f9f');
      gradient.addColorStop(1, '#1a237e');
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Draw board background
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      this.ctx.fillRect(
        this.boardX, 
        this.boardY, 
        this.boardSize, 
        this.boardSize
      );
      
      // Draw grid
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      this.ctx.lineWidth = 2;
      
      // Vertical lines
      for (let i = 1; i < 3; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.boardX + i * this.cellSize, this.boardY);
        this.ctx.lineTo(this.boardX + i * this.cellSize, this.boardY + this.boardSize);
        this.ctx.stroke();
      }
      
      // Horizontal lines
      for (let i = 1; i < 3; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.boardX, this.boardY + i * this.cellSize);
        this.ctx.lineTo(this.boardX + this.boardSize, this.boardY + i * this.cellSize);
        this.ctx.stroke();
      }
      
      // Draw board pieces
      for (let i = 0; i < 9; i++) {
        if (this.board[i]) {
          const cellX = this.boardX + (i % 3) * this.cellSize + this.cellSize / 2;
          const cellY = this.boardY + Math.floor(i / 3) * this.cellSize + this.cellSize / 2;
          const size = this.cellSize * 0.8 / 2;
          
          if (this.board[i] === 'X') {
            this.drawX(cellX, cellY, size, 1);
          } else {
            this.drawO(cellX, cellY, size, 1);
          }
        }
      }
      
      // Draw animations
      for (const anim of this.animations) {
        const progress = anim.progress / anim.duration;
        
        if (anim.type === 'X') {
          this.drawX(anim.x, anim.y, anim.size, progress);
        } else if (anim.type === 'O') {
          this.drawO(anim.x, anim.y, anim.radius, progress);
        } else if (anim.type === 'line') {
          this.ctx.strokeStyle = anim.color;
          this.ctx.lineWidth = 5;
          this.ctx.lineCap = 'round';
          
          const currentEndX = anim.startX + (anim.endX - anim.startX) * progress;
          const currentEndY = anim.startY + (anim.endY - anim.startY) * progress;
          
          this.ctx.beginPath();
          this.ctx.moveTo(anim.startX, anim.startY);
          this.ctx.lineTo(currentEndX, currentEndY);
          this.ctx.stroke();
        }
      }
      
      // Draw current player indicator
      this.ctx.fillStyle = 'white';
      this.ctx.font = '20px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(
        `Current Player: ${this.currentPlayer}`, 
        this.canvas.width / 2, 
        this.boardY - 20
      );
      
      // Draw score
      this.ctx.fillStyle = 'white';
      this.ctx.font = '20px Arial';
      this.ctx.textAlign = 'left';
      this.ctx.fillText(`Score: ${this.score}`, 10, 30);
      
      // Draw game over message
      if (this.gameOver) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 40px Arial';
        this.ctx.textAlign = 'center';
        
        if (this.winLine) {
          this.ctx.fillText(
            `Player ${this.currentPlayer} wins!`, 
            this.canvas.width / 2, 
            this.canvas.height / 2 - 20
          );
        } else {
          this.ctx.fillText(
            "It's a draw!", 
            this.canvas.width / 2, 
            this.canvas.height / 2
          );
        }
        
        this.ctx.font = '20px Arial';
        this.ctx.fillText(
          'Click to play again', 
          this.canvas.width / 2, 
          this.canvas.height / 2 + 40
        );
      }
    }
    
    drawX(x, y, size, progress) {
      // Draw X with animation
      this.ctx.strokeStyle = '#ff5252';
      this.ctx.lineWidth = 8;
      this.ctx.lineCap = 'round';
      
      // First line of X
      const length = size * 2 * progress;
      
      this.ctx.beginPath();
      this.ctx.moveTo(x - size, y - size);
      const endX1 = x - size + length;
      const endY1 = y - size + length;
      this.ctx.lineTo(
        Math.min(endX1, x + size),
        Math.min(endY1, y + size)
      );
      this.ctx.stroke();
      
      // Second line of X (only if first line is complete)
      if (progress > 0.5) {
        const secondProgress = (progress - 0.5) * 2; // Scale 0.5-1 to 0-1
        const length2 = size * 2 * secondProgress;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x + size, y - size);
        const endX2 = x + size - length2;
        const endY2 = y - size + length2;
        this.ctx.lineTo(
          Math.max(endX2, x - size),
          Math.min(endY2, y + size)
        );
        this.ctx.stroke();
      }
    }
    
    drawO(x, y, radius, progress) {
      // Draw O with animation
      this.ctx.strokeStyle = '#2196f3';
      this.ctx.lineWidth = 8;
      
      const endAngle = progress * Math.PI * 2;
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, endAngle);
      this.ctx.stroke();
    }
    
    resetGame() {
      this.board = Array(9).fill(null);
      this.currentPlayer = 'X';
      this.gameOver = false;
      this.winLine = null;
      this.animations = [];
    }
    
    dispose() {
      this.disposed = true;
      this.canvas.removeEventListener('click', this.handleClick);
      if (this.backBtn && this.backBtn.parentNode) {
        this.backBtn.parentNode.removeChild(this.backBtn);
      }
      
      // Cancel any pending animation frames
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }
    
    start() {
      this.disposed = false;
      
      const gameLoop = (timestamp) => {
        if (this.disposed) return;
        
        this.update();
        this.draw();
        
        if (!this.disposed) {
          this.animationFrameId = requestAnimationFrame(gameLoop);
        }
      };
      
      this.animationFrameId = requestAnimationFrame(gameLoop);
    }
  }
  
  // Modify the window load event to be more robust
  window.addEventListener('DOMContentLoaded', () => {
    try {
      console.log("DOM Content Loaded - initializing game engine");
      window.gameEngine = new GameEngine();
    } catch (error) {
      console.error("Error creating game engine:", error);
    }
  });