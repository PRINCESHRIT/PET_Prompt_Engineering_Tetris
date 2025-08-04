# Tacit Knowledge: PET Development Wisdom

> **Tribal knowledge that isn't written down elsewhere**

## 📋 Executive Summary

This document captures the **tacit knowledge** - the unwritten wisdom, insights, and lessons learned - that guides PET development. This is the knowledge that experienced developers know but rarely document, the "tribal wisdom" that makes the difference between a good tool and a revolutionary one.

## 🎯 Why Tacit Knowledge Matters

### **The Knowledge Gap**
- **Explicit knowledge** is documented in specs and requirements
- **Tacit knowledge** is learned through experience and practice
- **Missing tacit knowledge** leads to poor decisions and failed implementations
- **Capturing tacit knowledge** accelerates development and improves quality

### **PET-Specific Wisdom**
- **Constraint-driven development** insights
- **Local AI integration** lessons learned
- **Accessibility-first design** principles
- **Privacy-by-design** implementation patterns
- **Tetris metaphor** optimization techniques

## 🎮 Tetris Metaphor Wisdom

### **🎯 Why Tetris Works for Prompts**

#### **The Psychology of Tetris**
- **Spatial thinking** activates different parts of the brain than text
- **Immediate feedback** creates satisfying flow states
- **Limited resources** (15 blocks) force creative constraint
- **Visual completion** provides instant gratification
- **Universal understanding** - everyone knows Tetris

#### **Block Psychology**
- **T-block feels foundational** - users naturally put it first
- **I-block feels directional** - clear forward movement
- **L-block feels constraining** - boundaries and limits
- **O-block feels structural** - organization and format
- **S-block feels thoughtful** - reasoning and process
- **Z-block feels illustrative** - examples and patterns
- **J-block feels content-heavy** - raw information

### **🎨 Visual Design Insights**

#### **Color Psychology in 80s Terminal**
- **Green on black** reduces eye strain during long sessions
- **Monochrome** eliminates color-based cognitive load
- **High contrast** improves accessibility and readability
- **Retro aesthetic** creates nostalgia and engagement
- **Pixelated fonts** feel authentic and trustworthy

#### **Layout Wisdom**
- **5x3 grid** is the sweet spot - not too big, not too small
- **Left toolbox** follows natural reading patterns
- **Center workspace** provides focus area
- **Right feedback** panel doesn't interfere with work
- **Bottom status** bar provides context without distraction

## 🤖 Local AI Integration Secrets

### **🎯 Gemma 3N Optimization**

#### **Model Loading Strategies**
- **Progressive loading** - show UI first, load AI in background
- **Loading indicators** - users need to know something is happening
- **Fallback systems** - always have a plan B when AI isn't ready
- **Memory management** - clean up after each inference
- **Error handling** - graceful degradation when AI fails

#### **Performance Optimization**
- **Batch processing** - group similar operations
- **Caching results** - don't recompute the same thing
- **Lazy evaluation** - only process when needed
- **Background workers** - don't block the UI
- **Memory pooling** - reuse objects to reduce GC pressure

### **🎤 Voice Recognition Tricks**

#### **Command Recognition Patterns**
- **Exact matches first** - "T-block" before fuzzy matching
- **Common variations** - "add T", "T piece", "T block"
- **Context awareness** - different commands in different modes
- **Confidence thresholds** - only execute high-confidence commands
- **Feedback loops** - confirm actions to build user confidence

#### **Voice UX Insights**
- **Audio feedback** is crucial - users need to hear what happened
- **Visual indicators** complement audio - show what's being processed
- **Error recovery** - "I didn't understand, try again" with suggestions
- **Training mode** - help users learn the voice commands
- **Accent adaptation** - learn from user corrections

## ♿ Accessibility Deep Knowledge

### **🎯 Screen Reader Optimization**

#### **Semantic Structure**
- **ARIA labels** must be descriptive and helpful
- **Heading hierarchy** guides navigation
- **Landmark regions** organize content
- **Live regions** announce dynamic changes
- **Focus management** follows logical flow

#### **Voice Navigation Patterns**
- **Tab order** must be logical and predictable
- **Skip links** bypass repetitive navigation
- **Focus indicators** must be visible and clear
- **Keyboard shortcuts** provide power user access
- **Error announcements** help users understand problems

### **🎨 Visual Accessibility**

#### **Color and Contrast**
- **4.5:1 ratio** minimum for normal text
- **3:1 ratio** minimum for large text
- **Color alone** cannot convey information
- **High contrast mode** must be available
- **Dark mode** reduces eye strain

#### **Typography Wisdom**
- **16px minimum** for body text
- **1.5 line height** for readability
- **Font scaling** must work up to 200%
- **Monospace fonts** improve code readability
- **Letter spacing** helps with dyslexia

## 🔒 Privacy Implementation Secrets

### **🎯 Local-First Architecture**

#### **Data Flow Patterns**
- **No external calls** after initial load
- **Local storage** for all user data
- **Memory-only** for sensitive information
- **Encryption** for stored data
- **User control** over all data

#### **Security Considerations**
- **Input sanitization** prevents XSS attacks
- **Content Security Policy** blocks external resources
- **Sandboxing** isolates AI processing
- **Regular cleanup** removes temporary data
- **Audit trails** for debugging (local only)

### **🤖 AI Privacy Patterns**

#### **Model Security**
- **Local inference** - no data leaves the device
- **Model isolation** - AI can't access other apps
- **Memory protection** - clear sensitive data after use
- **No telemetry** - AI doesn't report usage
- **User control** - can disable AI features

## 📱 Mobile Optimization Wisdom

### **🎯 Touch Interface Design**

#### **Touch Target Sizing**
- **44px minimum** for touch targets
- **8px spacing** between interactive elements
- **Visual feedback** for all touch actions
- **Gesture support** for power users
- **Haptic feedback** when available

#### **Performance Optimization**
- **60 FPS** is non-negotiable
- **Reduce repaints** - batch DOM updates
- **Use transforms** instead of position changes
- **Debounce input** to prevent lag
- **Background processing** for heavy operations

### **📊 Mobile UX Patterns**

#### **Responsive Design**
- **Mobile-first** approach ensures mobile works
- **Progressive enhancement** adds desktop features
- **Touch-friendly** controls on all devices
- **Voice prominence** on mobile interfaces
- **Offline capability** is essential

## 🎨 80s Terminal Aesthetic Secrets

### **🎯 Authentic Retro Feel**

#### **Typography Choices**
- **Share Tech Mono** - authentic terminal font
- **Monospace** ensures consistent spacing
- **Pixel-perfect** rendering for authenticity
- **Character spacing** matches original terminals
- **Line height** optimized for readability

#### **Color Palette Wisdom**
- **Green (#00FF00)** - classic terminal green
- **Black (#000000)** - pure background
- **Gray (#666666)** - for inactive elements
- **White (#FFFFFF)** - for highlights
- **No gradients** - pure colors only

### **🎮 Visual Effects**

#### **Authentic Details**
- **Scan lines** - subtle CRT effect
- **Glow effects** - phosphor persistence
- **Pixel borders** - authentic block graphics
- **Flicker effects** - occasional screen refresh
- **No anti-aliasing** - crisp pixel edges

## 🔧 Technical Implementation Wisdom

### **🎯 Vanilla JavaScript Patterns**

#### **Performance Optimization**
- **Event delegation** reduces memory usage
- **Debouncing** prevents excessive function calls
- **Throttling** limits execution frequency
- **Memoization** caches expensive calculations
- **Lazy loading** defers non-critical operations

#### **Code Organization**
- **Module pattern** - organize code without frameworks
- **Observer pattern** - loose coupling between components
- **Factory pattern** - create objects consistently
- **Strategy pattern** - swap algorithms easily
- **Command pattern** - encapsulate user actions

### **🎨 Canvas Optimization**

#### **Rendering Performance**
- **RequestAnimationFrame** for smooth animations
- **Off-screen canvas** for complex drawings
- **Dirty rectangle** rendering - only redraw what changed
- **Object pooling** - reuse canvas objects
- **Layer management** - separate UI from game elements

#### **Memory Management**
- **Clear unused canvases** - prevent memory leaks
- **Resize carefully** - avoid creating new canvases
- **Image caching** - store frequently used graphics
- **Garbage collection** - help browser clean up
- **Memory monitoring** - track usage patterns

## 🧠 Cognitive Load Management

### **🎯 User Experience Insights**

#### **Mental Model Alignment**
- **Tetris metaphor** matches spatial thinking
- **Block types** have clear, distinct purposes
- **Visual feedback** confirms user actions
- **Progressive disclosure** - show complexity gradually
- **Consistent patterns** reduce learning time

#### **Flow State Design**
- **Immediate feedback** - users see results instantly
- **Clear goals** - each action has purpose
- **Balanced challenge** - not too easy, not too hard
- **No interruptions** - minimize distractions
- **Satisfying completion** - celebrate achievements

### **🎮 Gamification Wisdom**

#### **Engagement Patterns**
- **Progress indicators** - show completion status
- **Achievement system** - celebrate milestones
- **Scoring feedback** - quantify improvement
- **Challenge levels** - provide growth opportunities
- **Social sharing** - let users show off work

## 🔍 Quality Assurance Secrets

### **🎯 Testing Strategies**

#### **User Testing Insights**
- **5 users** find 85% of usability issues
- **Think aloud** protocol reveals mental models
- **Task completion** metrics measure effectiveness
- **Error recovery** testing shows resilience
- **Accessibility testing** with real users

#### **Performance Testing**
- **Real devices** - test on actual hardware
- **Network simulation** - test offline scenarios
- **Memory profiling** - track resource usage
- **Load testing** - stress test with many blocks
- **Battery testing** - measure power consumption

### **🐛 Debugging Wisdom**

#### **Common Issues**
- **Memory leaks** - check event listeners and timers
- **Performance issues** - profile rendering and AI processing
- **Accessibility bugs** - test with screen readers
- **Voice recognition** - test with different accents
- **Mobile issues** - test on various devices

#### **Debugging Tools**
- **Browser dev tools** - essential for web development
- **Performance profiler** - identify bottlenecks
- **Memory profiler** - find memory leaks
- **Accessibility audit** - check compliance
- **Voice testing** - simulate different conditions

## 🚀 Deployment Wisdom

### **🎯 Single File Deployment**

#### **Bundling Strategies**
- **Inline everything** - CSS, JS, images as data URLs
- **Minify code** - reduce file size
- **Compress assets** - optimize images and fonts
- **Tree shaking** - remove unused code
- **Source maps** - for debugging (optional)

#### **Distribution Patterns**
- **GitHub releases** - version control and distribution
- **CDN hosting** - fast global access
- **Local hosting** - for offline environments
- **Progressive Web App** - installable experience
- **Documentation** - clear setup instructions

### **📊 Analytics and Feedback**

#### **Privacy-Preserving Metrics**
- **Local analytics** - track usage without external calls
- **User feedback** - in-app feedback system
- **Error reporting** - local error logging
- **Performance monitoring** - track local metrics
- **A/B testing** - local experiment framework

## 🎯 Future-Proofing Wisdom

### **🔮 Technology Evolution**

#### **AI Model Updates**
- **Model versioning** - track model changes
- **Backward compatibility** - support old models
- **Progressive enhancement** - add new features gracefully
- **Fallback systems** - work without latest models
- **User choice** - let users select model versions

#### **Browser Evolution**
- **Feature detection** - check for new APIs
- **Polyfills** - support older browsers
- **Progressive enhancement** - add features when available
- **Graceful degradation** - work without new features
- **Standards compliance** - follow web standards

### **🌍 Community Building**

#### **Open Source Wisdom**
- **Clear documentation** - help others contribute
- **Code comments** - explain complex logic
- **Issue templates** - structure bug reports
- **Contributing guidelines** - welcome new developers
- **Code of conduct** - create inclusive community

#### **User Community**
- **Feedback channels** - multiple ways to get input
- **User guides** - help users succeed
- **Video tutorials** - visual learning
- **Community forum** - user-to-user support
- **Showcase gallery** - highlight user work

## 📈 Success Metrics Wisdom

### **🎯 Measuring Impact**

#### **User Success Metrics**
- **Time to first prompt** - how quickly users create their first prompt
- **Prompt quality scores** - average validation scores
- **Voice command accuracy** - percentage of successful commands
- **Accessibility compliance** - WCAG 2.1 AA adherence
- **User retention** - how many users return

#### **Technical Success Metrics**
- **Performance** - 60 FPS on target devices
- **Memory usage** - < 2GB RAM consumption
- **Load time** - < 3 seconds to interactive
- **Error rate** - < 1% of user actions fail
- **Accessibility** - 100% screen reader compatibility

### **🎮 Engagement Metrics**

#### **User Behavior Patterns**
- **Block usage** - which blocks are used most
- **Voice adoption** - percentage of users using voice
- **Mobile usage** - how many users on mobile
- **Offline usage** - how often used without internet
- **Feature discovery** - which features users find

## 🎯 Implementation Priorities

### **🏆 Must-Have Wisdom**
1. **Start with constraints** - let them guide design
2. **Test with real users** - especially accessibility users
3. **Optimize for mobile** - most users will be on mobile
4. **Prioritize privacy** - never compromise on privacy
5. **Keep it simple** - complexity is the enemy

### **🚀 Should-Have Wisdom**
1. **Voice control** - essential for accessibility
2. **Local AI** - core differentiator
3. **80s aesthetic** - creates distinctive identity
4. **Performance** - 60 FPS is non-negotiable
5. **Offline capability** - works without internet

### **✨ Nice-to-Have Wisdom**
1. **Advanced features** - add after core is solid
2. **Customization** - let users personalize
3. **Analytics** - privacy-preserving metrics
4. **Community features** - build user ecosystem
5. **Advanced AI** - more sophisticated models

---

**This tacit knowledge represents the collective wisdom of experienced developers and designers. It's the difference between building a tool and building a revolution.** 