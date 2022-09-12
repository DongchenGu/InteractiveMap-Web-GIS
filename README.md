# InteractiveMap Web GIS
<div align=center>
<img src="https://user-images.githubusercontent.com/53630148/189499108-04dbf28c-a176-4906-8605-69fe455a1868.png">
</div>

# Description
Front End Part is based on React, leaflet, PIXIjs and Html5.  
Back End Part is based on SpringBoot and MongoDB.  
- The web system provides interactive maps, where itineraries and events can be marked directly on the map, we provide some different styles of map for the user! and various 2D interactive markers are provided. 
Users can add point Markers, rectangles, polygons, lines, circles, text and even paint on the Map. User can sign up and sign in with their username and password, 
search the citys by the name.  
- The map is based on Leaflet which is famous in the GIS area. Leaflet itself can't support any text on it, that’s an issue. I use PIXIjs to draw text, and innovatively integrate the text layer onto the leaflet map, so that the functions of the interactive map has been expanded.  
- Use html5 canvas to create the brush tool, so users could make rough sketch with the map as the background.  
- All the tools, menu and maps are integrated by React framework, and use Redux to transfer the state between different Components.  

# Main Function
- Point Mark  
put point marker on the map
![point](https://user-images.githubusercontent.com/53630148/189499258-bc1cd8ba-1140-4582-89ad-6d7698b6ee3b.gif)

- Polygon Mark  
select the polygon tool and then click the key point on the map to draw the Polygon
![polygon](https://user-images.githubusercontent.com/53630148/189499382-67fff2e5-2f1b-4602-8145-70485cb19472.gif)

- Text Mark  
write the text into the property menu, then put the text onto the map
![TEXT](https://user-images.githubusercontent.com/53630148/189499318-b9cf288c-aee0-4e43-844a-bf5f154d081e.gif)

- Circle Mark  
Click on the center of the circle and drag to draw the circle
![circle](https://user-images.githubusercontent.com/53630148/189499442-55386d20-ffb6-461e-bd14-17e5cf56233a.gif)

- Line Mark    
click on the map to select the key point to draw a line
![line](https://user-images.githubusercontent.com/53630148/189499482-bc079706-3df4-425b-ad49-ead41cf09c5c.gif)

- Paint on the map  
select the Paint Tool, then there is a canvas added onto to map, so that you can draw what you what on to the map
![paint](https://user-images.githubusercontent.com/53630148/189499526-2330ae2a-7211-4e5a-bd32-6e02881c57b1.gif)

- Rectangle Mark  
use two key point to draw a rectangle onto the map
![rectangle](https://user-images.githubusercontent.com/53630148/189499592-7ae7bd2d-a91b-4f42-a6e7-a884cce8d20c.gif)

# How to build
- get into the Front dir
- use "npm start"
