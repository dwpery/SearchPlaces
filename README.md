<p align="center"><img height="100" src="/dist/media/img/SearchPlacesLogo.svg"></p>
<hr>
<p align="center"><a target="_blank" href="https://searchplaces.web.app/"><img src="/dist/media/img/PWAicon.svg"></a><a target="_blank" href="https://github.com/dwpery/SearchPlaces/releases"><img src="/dist/media/img/PreReleaseIcon.svg"></a></p>
<hr>
<p><b>SearchPlaces</b> is a powerful Progressive Web App (PWA) that allows you to create custom browser homepages to act as your gateway to the web whenever you open your browser!</p>
<h2>Contents</h2>
<ol>
<li><a href="#1">When is the initial release?</a></li>
<li><a href="#2">Building from Source Code?</a></li>
</ol>
<h2 id="1">When is the initial release?</h2>
<p>SearchPlaces is currently slated for a summer 2024 release, wether this is feature complete and a ful v1.0.0 launch or a Beta Pre-release is still yet to be seen.</p>
<h2 id="2">Building from Source Code?</h2>
<p>Once the source code has been installed, run the following:</p>
<code>npm install</code>
<p><br>Then once you have made changes to the JavaScript code, open the terminal and type:</p>
<code>node_modules/.bin/webpack</code>
<p><br>This will bundle the JavaScript code from <code>src</code> into the <code>dist</code> folder, then type:</p>
<code>firebase serve</code>
<p><br>This will run the project as if it is on a server locally</p>