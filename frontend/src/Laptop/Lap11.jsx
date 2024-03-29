/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 Lap1.gltf 
Author: Rohit3DAsset (https://sketchfab.com/Rohit3Dasset)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/sci-fi-laptop-7beb41eb71bd44f3ac193a9a5d8760b0
Title: Sci-fi  Laptop
*/
"use client"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'




export default function Laptop3d(props) {
  const { nodes, materials } = useGLTF('/Laptop/Lap1.glb')
  const { camera } = useThree();
  // Set the initial camera position for zoom
  camera.position.set(0.45, 0.45, 0.45);
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={6.245}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group position={[3.532, 0, 1.599]} rotation={[-Math.PI, 0, -Math.PI]}>
            <mesh geometry={nodes.pCylinder15_Lap_tex_0.geometry} material={materials.Lap_tex} />
            <mesh geometry={nodes.polySurface13_Lap_tex_0.geometry} material={materials.Lap_tex} />
            <mesh geometry={nodes.R3D_Laptop2_pPlane4_Lap_tex_0.geometry} material={materials.Lap_tex} />
          </group>
          <group position={[-3.546, 0, 0]}>
            <mesh geometry={nodes.pCylinder15_Lap_tex_0_1.geometry} material={materials.Lap_tex} />
            <mesh geometry={nodes.polySurface13_Lap_tex_0_1.geometry} material={materials.Lap_tex} />
            <mesh geometry={nodes.R3D_Laptop2_pPlane4_Lap_tex_0_1.geometry} material={materials.Lap_tex} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Laptop/Lap1.glb')
