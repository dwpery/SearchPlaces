<p align="center"><img height="100" src="/dist/your-place/media/branding/fullLogo.svg"></p>
<hr>
<p align="center"><a target="_blank" href="https://github.com/dwpery/SearchPlaces/releases"><img src="/dist/your-place/media/branding/PreReleaseIcon.svg"></a><a target="_blank" href="https://searchplaces.web.app/"><img src="/dist/your-place/media/branding/PWAicon.svg"></a></p>
<hr>
<p><b>SearchPlaces</b> is a free to use (and Open Source) creativity platform that enables you to create your own browser homepage with in depth customisation options!</p>
<h2>Contents</h2>
<ol>
<li><a href="#1">What can we expect in terms of customisation?</a></li>
<li><a href="#2">Building from Source Code?</a></li>
</ol>
<h2 id="1">What can we expect in terms of customisation?</h2>
<p>Users will spend the majority of their time creating in the 'Toolbox,' this menu holds all of the elements a user can add to their Place. Those elements currently are:</p>
<ul>
<li>Text</li>
<li>Images (by URL)</li>
<li>GIFs (by URL)</li>
<li>Videos (by URL)</li>
<li>Shapes</li>
<li>Stickers</li>
</ul>
<p>Each element comes with its own suite of editable properties that the user can mess around with to create their perfect Place!</p>
<p>The 'Properties' menu allows you to edit the general properties of your Place such as preferred search engine, search destination and wether the background is a colour or image. </p>
<h2 id="2">Building from Source Code?</h2>
<p>Once the source code has been installed, run the following:</p>
<code>npm install</code>
<p><br>Then once you have made changes to the JavaScript code, open the terminal and type:</p>
<code>node_modules/.bin/webpack</code>
<p><br>This will bundle the JavaScript code from <code>src</code> into the <code>dist</code> folder, then type:</p>
<code>firebase serve</code>
<p><br>This will run the project as if it is on a server locally</p>