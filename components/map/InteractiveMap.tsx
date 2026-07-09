'use client';

import React,{
    useState,
    useEffect,
    useMemo,
    useRef,
    useCallback,
    createContext,
    useContext,
    Suspense
} from "react";

import dynamic from "next/dynamic";

import {
    MapContainer,
    TileLayer,
    useMap,
    useMapEvents,
    ZoomControl,
    ScaleControl
} from "react-leaflet";

import type {
    Map as LeafletMap,
    LatLngBounds,
    LatLngExpression
} from "leaflet";

import "leaflet/dist/leaflet.css";

const ClusterLayer = dynamic(
    ()=>import("./ClusterLayers"),
    {ssr:false}
);

const HeatmapLayer = dynamic(
    ()=>import("./HeatmapLayer"),
    {ssr:false}
);

const PolygonLayer = dynamic(
    ()=>import("./PolygonLayer"),
    {ssr:false}
);

const ProvinceLayer = dynamic(
    ()=>import("./ProvinceLayer"),
    {ssr:false}
);

const HotspotLayer = dynamic(
    ()=>import("./HotspotLayer"),
    {ssr:false}
);

const MarkerLayer = dynamic(
    ()=>import("./MarkerLayer"),
    {ssr:false}
);

const RadiusSearch = dynamic(
    ()=>import("./RadiusSearch"),
    {ssr:false}
);

const RoutingPanel = dynamic(
    ()=>import("./RoutingPanel"),
    {ssr:false}
);

const LayerSwitcher = dynamic(
    ()=>import("./LayerSwitcher"),
    {ssr:false}
);

const TimeSlider = dynamic(
    ()=>import("./TimeSlider"),
    {ssr:false}
);

const Controls = dynamic(
    ()=>import("./Controls"),
    {ssr:false}
);

const Legend = dynamic(
    ()=>import("./Legend"),
    {ssr:false}
);

const MapToolbar = dynamic(
    ()=>import("./MapToolbar"),
    {ssr:false}
);

const MapSearch = dynamic(
    ()=>import("./MapSearch"),
    {ssr:false}
);

const MapMiniStats = dynamic(
    ()=>import("./MapMiniStats"),
    {ssr:false}
);

const MapPopup = dynamic(
    ()=>import("./MapPopup"),
    {ssr:false}
);

const LoadingOverlay = dynamic(
    ()=>import("./LoadingOverlay"),
    {ssr:false}
);

interface LayerVisibility{

    cluster:boolean;

    heatmap:boolean;

    marker:boolean;

    hotspot:boolean;

    polygon:boolean;

    province:boolean;

    routing:boolean;

    radius:boolean;

}

interface InteractiveMapProps{

    initialCenter?:LatLngExpression;

    initialZoom?:number;

}

interface MapContextValue{

    map:LeafletMap|null;

    selectedReport:string|null;

    setSelectedReport:(id:string|null)=>void;

    bounds:LatLngBounds|null;

    layers:LayerVisibility;

    setLayers:React.Dispatch<
        React.SetStateAction<LayerVisibility>
    >;

}

const MapContext=createContext<
MapContextValue|null
>(null);

export function useInteractiveMap(){

    const ctx=useContext(MapContext);

    if(!ctx){

        throw new Error(
            "MapContext missing."
        );

    }

    return ctx;

}

function MapInitializer({

    mapRef,

    setBounds

}:{

    mapRef:React.MutableRefObject<
        LeafletMap|null
    >;

    setBounds:(b:LatLngBounds)=>void;

}){

    const map=useMap();

    useEffect(()=>{

        try {
            mapRef.current=map;
            setBounds(map.getBounds());
        } catch (error) {
            console.error('Error initializing map:', error);
        }

    },[map]);

    return null;

}

function MapEvents({

    onMove

}:{

    onMove:()=>void;

}){

    useMapEvents({

        moveend:onMove,

        zoomend:onMove,

        resize:onMove

    });

    return null;

}

const DEFAULT_LAYERS:LayerVisibility={

    cluster:true,

    heatmap:true,

    marker:true,

    hotspot:true,

    polygon:false,

    province:false,

    routing:false,

    radius:false

};

const InteractiveMap: React.FC<InteractiveMapProps> = ({
    initialCenter = [-6.2, 106.816666],
    initialZoom = 6,
}) => {

    if(typeof window==="undefined"){

        return null;

    }

    const mapRef = useRef<LeafletMap | null>(null);

    const [bounds, setBounds] =
        useState<LatLngBounds | null>(null);

    const [selectedReport, setSelectedReport] =
        useState<string | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [layers, setLayers] =
        useState<LayerVisibility>(DEFAULT_LAYERS);

    const [baseLayer, setBaseLayer] =
        useState<
            "street" |
            "satellite" |
            "terrain"
        >("street");


const updateBounds = useCallback(() => {

    if (!mapRef.current) return;

    try {
        setBounds(
            mapRef.current.getBounds()
        );
    } catch (error) {
        console.error('Error updating bounds:', error);
    }

}, []);

useEffect(() => {

    setLoading(true);

    const timer = setTimeout(() => {

        setLoading(false);

    }, 700);

    return () => clearTimeout(timer);

}, []);

const contextValue = useMemo(() => ({

    map: mapRef.current,

    selectedReport,

    setSelectedReport,

    bounds,

    layers,

    setLayers

}), [

    selectedReport,

    bounds,

    layers,

    setLayers

]);

const tileURL = useMemo(() => {

    switch (baseLayer) {

        case "satellite":

            return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

        case "terrain":

            return "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";

        default:

            return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    }

}, [baseLayer]);

const attribution = useMemo(() => {

    switch (baseLayer) {

        case "satellite":

            return "Tiles © Esri";

        case "terrain":

            return "© OpenTopoMap";

        default:

            return "© OpenStreetMap";

    }

}, [baseLayer]);

const fitToIndonesia = useCallback(() => {

    if (!mapRef.current) return;

    try {
        mapRef.current.fitBounds([
            [-11.2, 94.7],
            [6.3, 141.1],
        ]);
    } catch (error) {
        console.error('Error fitting bounds to Indonesia:', error);
    }

}, []);

const toggleFullscreen = useCallback(() => {

    if (!document.fullscreenEnabled) {
        console.warn('Fullscreen API is not supported in this browser');
        return;
    }

    const element = document.documentElement;

    if (!document.fullscreenElement) {

        element.requestFullscreen().catch(() => {});

    } else {

        document.exitFullscreen().catch(() => {});

    }

}, []);

useEffect(() => {

    let debounceTimer: NodeJS.Timeout | null = null;

    const handler = (e: KeyboardEvent) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
            return;
        }

        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(() => {
            if (e.key === "f") {
                toggleFullscreen();
            }

            if (e.key === "h") {
                setLayers((prev) => ({
                    ...prev,
                    heatmap: !prev.heatmap,
                }));
            }

            if (e.key === "c") {
                setLayers((prev) => ({
                    ...prev,
                    cluster: !prev.cluster,
                }));
            }

            if (e.key === "m") {
                setLayers((prev) => ({
                    ...prev,
                    marker: !prev.marker,
                }));
            }

            if (e.key === "i") {
                fitToIndonesia();
            }
        }, 100);
    };

    window.addEventListener("keydown", handler);

    return () => {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        window.removeEventListener("keydown", handler);
    };

}, [fitToIndonesia, toggleFullscreen, setLayers]);

useEffect(() => {

    if (!mapRef.current) return;

    if (typeof ResizeObserver === 'undefined') {
        console.warn('ResizeObserver is not supported in this browser');
        return;
    }

    const observer = new ResizeObserver(() => {

        mapRef.current?.invalidateSize();

    });

    const mapContainer = mapRef.current.getContainer();
    if (mapContainer) {
        observer.observe(mapContainer);
    }

    return () => observer.disconnect();

}, []);

const visibleLayers = useMemo(() => {

    return Object.entries(layers)

        .filter(([, enabled]) => enabled)

        .map(([name]) => name);

}, [layers]);

const [fps,setFPS]=useState(60);

useEffect(()=>{

    let last=performance.now();

    let frames=0;

    let animation:number;

    let isPaused=false;

    const loop=(time:number)=>{

        if(isPaused){
            animation=requestAnimationFrame(loop);
            return;
        }

        frames++;

        if(time>=last+1000){

            setFPS(frames);

            frames=0;

            last=time;

        }

        animation=requestAnimationFrame(loop);

    };

    const handleVisibilityChange=()=>{
        isPaused=document.hidden;
    };

    document.addEventListener('visibilitychange',handleVisibilityChange);

    animation=requestAnimationFrame(loop);

    return()=>{
        cancelAnimationFrame(animation);
        document.removeEventListener('visibilitychange',handleVisibilityChange);
    };

},[]);

const memory=useMemo(()=>{

    if(typeof performance==="undefined"){

        return null;

    }

    try {
        const perf=performance as Performance & {
            memory?:{
                usedJSHeapSize:number;
            };
        };

        return perf.memory?.usedJSHeapSize
            ?(
                perf.memory.usedJSHeapSize
                /1024
                /1024
            ).toFixed(1)
            :"N/A";
    } catch (error) {
        console.warn('Memory monitoring not supported in this browser');
        return "N/A";
    }

},[]);

const aiStatus=useMemo(()=>{

    if(loading){

        return "Analyzing";

    }

    if(selectedReport){

        return "Processing Report";

    }

    return "Ready";

},[
loading,
selectedReport
]);

const viewportStatistics=useMemo(()=>{

    return{

        zoom:

        mapRef.current?.getZoom()

        ??0,

        layers:

        visibleLayers.length,

        bounds:

        bounds

        ?"Active"

        :"Waiting"

    };

},[
bounds,
visibleLayers
]);

return (

<MapContext.Provider
value={contextValue}
>

<div className="relative h-full w-full overflow-hidden rounded-xl">

{
loading &&

<LoadingOverlay />

}

<MapContainer

center={initialCenter}

zoom={initialZoom}

zoomControl={false}

scrollWheelZoom

style={{

height:"100%",

width:"100%"

}}

>

<MapInitializer

mapRef={mapRef}

setBounds={setBounds}

/>

<MapEvents

onMove={updateBounds}

/>

<ZoomControl

position="bottomright"

/>

<ScaleControl

position="bottomleft"

/>

<TileLayer

url={tileURL}

attribution={attribution}

/>

{

layers.cluster &&

<Suspense fallback={null}>

<ClusterLayer />

</Suspense>

}

{

layers.marker &&

<Suspense fallback={null}>

<MarkerLayer

onSelectReport={

setSelectedReport

}

/>

</Suspense>

}

{

layers.heatmap &&

<Suspense fallback={null}>

<HeatmapLayer />

</Suspense>

}

{

layers.province &&

<Suspense fallback={null}>

<ProvinceLayer/>

</Suspense>

}

{

layers.polygon &&

<Suspense fallback={null}>

<PolygonLayer/>

</Suspense>

}

{
layers.hotspot && (

<Suspense fallback={null}>

<HotspotLayer/>

</Suspense>

)
}

{
layers.radius && (

<Suspense fallback={null}>

<RadiusSearch/>

</Suspense>

)
}

{
layers.routing && (

<Suspense fallback={null}>

<RoutingPanel/>

</Suspense>

)
}

<Suspense fallback={null}>

<MapPopup

reportId={selectedReport}

onClose={()=>

setSelectedReport(null)

}

/>

</Suspense>

<Suspense fallback={null}>

<MapToolbar

layers={layers}

setLayers={setLayers}

baseLayer={baseLayer}

setBaseLayer={setBaseLayer}

/>

</Suspense>

<Suspense fallback={null}>

<MapSearch/>

</Suspense>

<Suspense fallback={null}>

<LayerSwitcher

layers={layers}

setLayers={setLayers}

baseLayer={baseLayer}

setBaseLayer={setBaseLayer}

/>

</Suspense>

<Suspense fallback={null}>

<TimeSlider/>

</Suspense>

<Suspense fallback={null}>

<Legend/>

</Suspense>

<Suspense fallback={null}>

<Controls/>

</Suspense>

<Suspense fallback={null}>

<MapMiniStats

bounds={bounds}

/>

</Suspense>

</MapContainer>

{

loading && (

<div
className="
absolute
top-24
left-5
z-[1000]
"
>

<div
className="
bg-black/70
text-white
rounded-xl
px-3
py-2
text-[10px]
space-y-1
"
>

<div>⌨ Keyboard</div>

<div>F → Fullscreen</div>

<div>H → Heatmap</div>

<div>C → Cluster</div>

<div>M → Marker</div>

<div>I → Indonesia View</div>

</div>

</div>

)

}

<div
className="
absolute
bottom-5
left-5
z-[1001]
"
>

<div
className="
bg-white/90
backdrop-blur-md
rounded-xl
shadow-lg
px-4
py-3
text-xs
space-y-1
"
>

<div>

Bounds

</div>

<div>

{

bounds

?

"Viewport Ready"

:

"Loading..."

}

</div>

<div>

Base :

{baseLayer}

</div>

</div>

</div>

<div
className="
absolute
right-5
top-48
z-[1002]
"
>

<div
className="
bg-black/80
text-white
rounded-xl
px-4
py-3
text-xs
space-y-1
backdrop-blur-md
"
>

<div>

FPS : {fps}

</div>

<div>

Memory : {memory} MB

</div>

<div>

AI : {aiStatus}

</div>

<div>

Zoom :

{viewportStatistics.zoom}

</div>

<div>

Layers :

{viewportStatistics.layers}

</div>

</div>

</div>

<div
className="
absolute
bottom-28
left-5
z-[1003]
"
>

<div
className="
rounded-full
bg-gradient-to-r
from-emerald-500
to-blue-500
text-white
px-5
py-2
font-semibold
shadow-xl
"
>

EcoSnap AI GIS Engine v5

</div>

</div>

<div
className="
absolute
bottom-5
right-56
z-[1004]
"
>

<div
className="
rounded-xl
bg-white/90
backdrop-blur-md
shadow
px-4
py-2
text-xs
"
>

CTRL + Scroll → Zoom

<br/>

F → Fullscreen

<br/>

H → Heatmap

<br/>

C → Cluster

<br/>

I → Indonesia

</div>

</div>

<div
className="
absolute
top-5
left-5
z-[1005]
"
>

<div
className="
rounded-full
bg-emerald-600
text-white
px-4
py-2
shadow-xl
text-xs
font-semibold
animate-pulse
"
>

EcoSnap AI GIS Engine

</div>

</div>

</div>

</MapContext.Provider>

);

}
