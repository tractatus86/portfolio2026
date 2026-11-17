/* MAKERS poster: the editable score.
   One entry per frame (200 ms each by default). Each frame is a list of layers, drawn bottom to top.
   Coordinates are % of a square stage that covers the window (like object-fit: cover):
   x, y = top-left corner, w, h = size, rot = degrees, s = type size as % of stage width.
   Layer types:
     img   {src, x,y,w,h, pos:'50% 50%', rot, op, torn, invert}
     text  {txt, x,y, s, rot, f:'d' display | 'c' caps label, c: color key, skew, outline, lh}
     shape {k:'disc'|'half'|'bar'|'ring'|'cross'|'line'|'paper'|'grid', x,y,w,h, rot, c, op}
   Colors: cream, red, blue, yellow, ink, paper, char (charcoal scrap), line (hairline).
   Safe zone: the window shows at least x 27-73 (phones) and y 19-81 (laptops). */
window.MAKERS = {
  ms: 200,
  frames: [
  // 00 MAKERS: bust right, red half-disc, giant word at the bottom
  [ {t:'shape',k:'paper',x:-4,y:6,w:46,h:70,rot:-3,c:'char'},
    {t:'img',src:'bust',x:40,y:2,w:66,h:92,pos:'50% 35%',torn:1},
    {t:'shape',k:'half',x:14,y:26,w:26,h:26,c:'red'},
    {t:'shape',k:'grid',x:0,y:0,w:100,h:100},
    {t:'shape',k:'cross',x:46,y:22,w:30,h:30},
    {t:'text',txt:'MAKERS',x:4,y:52,s:27,skew:-8,c:'cream'} ],
  // 01 MAKE IT
  [ {t:'img',src:'jacquard',x:56,y:-2,w:36,h:104,pos:'50% 50%',torn:1,op:.85},
    {t:'shape',k:'bar',x:0,y:70,w:60,h:5,c:'blue'},
    {t:'text',txt:'MAKE',x:-6,y:84,s:34,rot:-90,c:'cream'},
    {t:'text',txt:'IT',x:62,y:38,s:40,skew:-8,c:'cream'},
    {t:'shape',k:'ring',x:24,y:18,w:22,h:22} ],
  // 02 WHO AM I TO MAKE?
  [ {t:'img',src:'press',x:44,y:14,w:44,h:58,rot:4,torn:1},
    {t:'shape',k:'disc',x:22,y:56,w:16,h:16,c:'yellow'},
    {t:'text',txt:'WHO AM I',x:8,y:24,s:15,c:'cream'},
    {t:'text',txt:'TO MAKE?',x:24,y:40,s:15,skew:-8,c:'cream'},
    {t:'shape',k:'line',x:0,y:76,w:100,h:0} ],
  // 03 THINK WITH YOUR HANDS
  [ {t:'img',src:'steamfitter',x:20,y:-4,w:70,h:108,pos:'50% 60%',op:.75},
    {t:'shape',k:'cross',x:40,y:36,w:30,h:30},
    {t:'text',txt:'THINK WITH',x:-2,y:30,s:17,rot:-12,c:'cream'},
    {t:'text',txt:'YOUR HANDS',x:30,y:58,s:17,rot:-12,c:'cream',skew:-6} ],
  // 04 WHAT AM I WHEN I DON'T MAKE? (the one color image)
  [ {t:'shape',k:'paper',x:22,y:18,w:60,h:66,rot:-2,c:'char'},
    {t:'img',src:'crt',x:30,y:30,w:42,h:32,crt:1},
    {t:'text',txt:'WHAT AM I',x:27,y:20,s:3.2,f:'c',c:'cream'},
    {t:'text',txt:'WHEN I DON\u2019T',x:27,y:64,s:6.5,c:'cream'},
    {t:'text',txt:'MAKE?',x:40,y:70,s:8,c:'red',skew:-8} ],
  // 05 BUILD SOMETHING
  [ {t:'img',src:'columns',x:-4,y:14,w:84,h:34,pos:'50% 40%',torn:1,op:.9},
    {t:'text',txt:'BUILD',x:6,y:44,s:34,skew:-8,c:'cream'},
    {t:'text',txt:'SOMETHING',x:76,y:84,s:9,rot:-90,c:'cream'},
    {t:'shape',k:'bar',x:6,y:80,w:30,h:3,c:'red'} ],
  // 06 IDEAS BECOME THINGS
  [ {t:'img',src:'drawing',x:-2,y:-2,w:104,h:104,op:.55},
    {t:'shape',k:'disc',x:60,y:22,w:22,h:22,c:'red'},
    {t:'text',txt:'IDEAS',x:24,y:30,s:12,c:'cream'},
    {t:'text',txt:'BECOME',x:34,y:44,s:12,c:'cream',skew:-8},
    {t:'text',txt:'THINGS',x:28,y:58,s:12,c:'cream'} ],
  // 07 WHO MAKES THE MAKER?
  [ {t:'img',src:'bust',x:28,y:-10,w:80,h:120,pos:'50% 40%',op:.9},
    {t:'shape',k:'ring',x:46,y:20,w:34,h:34},
    {t:'text',txt:'WHO MAKES',x:16,y:82,s:11,rot:-90,c:'cream'},
    {t:'text',txt:'THE MAKER?',x:34,y:68,s:10,skew:-8,c:'red'} ],
  // 08 MAKE IT (rocket)
  [ {t:'img',src:'rocket',x:38,y:-2,w:26,h:104,pos:'50% 40%',torn:1},
    {t:'text',txt:'MAKE',x:0,y:36,s:22,skew:-8,c:'cream'},
    {t:'text',txt:'IT',x:66,y:36,s:22,skew:-8,c:'cream'},
    {t:'shape',k:'line',x:0,y:62,w:100,h:0} ],
  // 09 MAKERS x3
  [ {t:'shape',k:'grid',x:0,y:0,w:100,h:100},
    {t:'text',txt:'MAKERS',x:-6,y:18,s:24,c:'cream',outline:1},
    {t:'text',txt:'MAKERS',x:12,y:40,s:24,skew:-8,c:'cream'},
    {t:'text',txt:'MAKERS',x:-14,y:62,s:24,c:'cream',outline:1},
    {t:'shape',k:'disc',x:72,y:20,w:10,h:10,c:'blue'} ],
  // 10 MAKE IT (computer)
  [ {t:'img',src:'eniac',x:6,y:16,w:88,h:64,pos:'50% 50%',torn:1,op:.85},
    {t:'text',txt:'MAKE IT',x:10,y:30,s:22,rot:-14,c:'red'},
    {t:'shape',k:'cross',x:60,y:20,w:24,h:24} ],
  // 11 camera
  [ {t:'shape',k:'paper',x:30,y:16,w:44,h:66,rot:3,c:'paper'},
    {t:'img',src:'camera',x:33,y:20,w:38,h:52,rot:3},
    {t:'shape',k:'cross',x:40,y:30,w:24,h:24},
    {t:'text',txt:'LOOK CLOSER',x:33,y:76,s:2.6,f:'c',c:'ink',rot:3} ],
  // 12 MAKERS vertical
  [ {t:'img',src:'tube',x:44,y:14,w:58,h:70,pos:'40% 50%',torn:1,op:.85},
    {t:'text',txt:'MAKERS',x:26,y:98,s:30,rot:-90,c:'cream',skew:-6},
    {t:'shape',k:'bar',x:44,y:84,w:40,h:3,c:'yellow'} ],
  // 13 WHAT AM I TO MAKE?
  [ {t:'img',src:'jacquard',x:-4,y:10,w:40,h:84,torn:1,op:.8},
    {t:'shape',k:'half',x:66,y:52,w:22,h:22,c:'blue',rot:180},
    {t:'text',txt:'WHAT AM I',x:34,y:28,s:11,c:'cream'},
    {t:'text',txt:'TO MAKE?',x:40,y:44,s:11,skew:-8,c:'cream'} ],
  // 14 M / A
  [ {t:'shape',k:'disc',x:46,y:30,w:36,h:36,c:'blue'},
    {t:'text',txt:'M',x:6,y:4,s:56,skew:-6,c:'cream'},
    {t:'text',txt:'A',x:56,y:40,s:56,c:'cream',outline:1},
    {t:'shape',k:'cross',x:30,y:30,w:40,h:40} ],
  // 15 NOTHING IS FINISHED
  [ {t:'img',src:'steamfitter',x:46,y:10,w:44,h:78,pos:'50% 70%',torn:1,op:.85},
    {t:'text',txt:'NOTHING',x:8,y:24,s:15,c:'cream'},
    {t:'text',txt:'IS',x:14,y:42,s:15,skew:-8,c:'red'},
    {t:'text',txt:'FINISHED',x:8,y:58,s:15,c:'cream'} ],
  // 16 WHAT COMES NEXT?
  [ {t:'img',src:'rocket',x:-2,y:-2,w:104,h:104,pos:'50% 20%',op:.6},
    {t:'shape',k:'bar',x:28,y:68,w:44,h:4,c:'yellow'},
    {t:'text',txt:'WHAT COMES',x:22,y:34,s:11,c:'cream'},
    {t:'text',txt:'NEXT?',x:30,y:48,s:15,skew:-8,c:'cream'} ],
  // 17 MAKERS (return)
  [ {t:'shape',k:'paper',x:-6,y:10,w:50,h:64,rot:2,c:'char'},
    {t:'img',src:'bust',x:42,y:4,w:64,h:88,pos:'50% 35%',torn:1},
    {t:'shape',k:'half',x:16,y:28,w:24,h:24,c:'red',rot:180},
    {t:'shape',k:'ring',x:50,y:20,w:30,h:30},
    {t:'text',txt:'MAKERS',x:6,y:52,s:26,skew:-8,c:'cream'} ]
  ]
};
