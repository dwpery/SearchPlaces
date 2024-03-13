<p align="center"><img height="100" src="/dist/media/branding/fullLogo.svg"></p>
<hr>
<p align="center"><a target="_blank" href="https://github.com/dwpery/SearchPlaces/releases"><img src="/dist/media/branding/PreReleaseIcon.svg"></a><a target="_blank" href="https://searchplaces.web.app/"><img src="/dist/media/branding/PWAicon.svg"></a></p>
<hr>
<p><b>SearchPlaces</b> is a free to use (and Open Source) creativity platform that enables you to create your own browser homepage with in depth customisation options!</p>
<h2>Contents</h2>
<ol>
<li><a href="#1">When is the initial release?</a></li>
<li><a href="#2">What can we expect in terms of customisation?</a></li>
<li><a href="#3">Building from Source Code?</a></li>
</ol>
<h2 id="1">When is the initial release?</h2>
<p>SearchPlaces will enter it's public beta on <b>Saturday 15th June 2024</b>. Things will not be complete or optimised at this stage but as the project enters the late stage of pre-release development the beta will be an opportunity for user feedback to be incorporated.</p>
<p>During beta, expect frequent but small updates which aren't tied to a specific update schedule. Once in full release Content Updates will be pushed on the first of every month containing new features, bug fixes, quality of life changes and much more!</p>
<h2 id="2">What can we expect in terms of customisation?</h2>
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
<h2 id="3">Building from Source Code?</h2>
<p>Once the source code has been installed, run the following:</p>
<code>npm install</code>
<p><br>Then once you have made changes to the JavaScript code, open the terminal and type:</p>
<code>node_modules/.bin/webpack</code>
<p><br>This will bundle the JavaScript code from <code>src</code> into the <code>dist</code> folder, then type:</p>
<code>firebase serve</code>
<p><br>This will run the project as if it is on a server locally</p>