<script lang="ts">
	import './Editor.css';
	import { onDestroy, onMount } from 'svelte';
	import { Editor, type JSONContent } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import PlaceholderExt from '@tiptap/extension-placeholder';
	import { createField } from 'felte';

	export let name: string;

	let editor: Editor;
	let element: Element;

	const { field, onInput, onBlur } = createField(name);

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit.configure({
					heading: false
				}),
				PlaceholderExt.configure({
					placeholder: 'Write some killer news stories...'
				})
			],

			onUpdate: () => {
				onInput(JSON.stringify(editor.getJSON()));
			},

			onBlur: () => {
				onBlur();
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="prose prose-zinc" bind:this={element} use:field />
