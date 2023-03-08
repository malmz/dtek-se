<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import { onMount } from 'svelte';

	let now: string;

	onMount(() => {
		const date = new Date();
		now = `${date.getHours()}`;
	});
</script>

<svelte:head>
	<title>Create event</title>
</svelte:head>

<Section>
	<h1 class="text-4xl font-bold mb-12">Skapa nytt arrangemang</h1>

	<!-- Below concerning times and dates. The start time/date should not be earlier than the end time/date -->
	<!-- Also try to fix so that all "You have to fill in these fields" comes up if you have more than one field left you have to fill in -->

	<form method="post" class="flex flex-col gap-4">
		<div class="flex gap-2">
			<div class="form-control w-full">
				<label for="start-time" class="label"><span class="label-text">Starttid</span></label>
				<input type="time" name="start-time" class="input input-bordered" value={now} required />
			</div>
			<div class="form-control w-full">
				<label for="start-date" class="label"><span class="label-text">Startdatum</span></label>
				<input type="date" name="start-date" class="input input-bordered" required />
			</div>
		</div>
		<div class="flex gap-2">
			<div class="form-control w-full">
				<label for="end-time" class="label"><span class="label-text">Sluttid</span></label>
				<input type="time" name="end-time" class="input input-bordered" required />
			</div>
			<div class="form-control w-full">
				<label for="end-date" class="label"><span class="label-text">Slutdatum</span></label>
				<input type="date" name="end-date" class="input input-bordered" required />
			</div>
		</div>

		<div class="form-control w-full">
			<label for="place">Plats</label>
			<label class="input-group">
				<input
					type="text"
					name="place"
					class="input input-bordered grow"
					placeholder="Plats..."
					required
				/>
				<span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-6 h-6"
					>
						<path
							fill-rule="evenodd"
							d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
							clip-rule="evenodd"
						/>
					</svg>
				</span>
			</label>
		</div>

		<div class="form-control w-full">
			<label for="cover" class="label"><span class="label-text">Omslagsbild</span></label>
			<input type="file" name="cover" class="file-input file-input-bordered" accept="image/*" />
		</div>

		<div class="form-control">
			<label for="altTextCover" class="label">
				<span class="label-text">Alternativ text för omslagsbild</span>
			</label>
			<input
				type="text"
				name="altTextCover"
				placeholder="Besrkrivande text för omslagsbilden..."
				class="input input-bordered"
			/>
			<!-- Above should have a condition that it is required IF a cover photo has been added  -->
		</div>

		<div class="divider divider-vertical">
			<span>Svenska</span>
		</div>

		<div class="form-control">
			<label for="title" class="label"><span class="label-text">Titel</span></label>
			<input
				type="text"
				name="title"
				placeholder="En fantastisk titel..."
				class="input input-bordered"
				required
			/>
		</div>

		<div>
			<label for="body" class="label"><span class="label-text">Body</span></label>
			<textarea
				name="body"
				class="textarea textarea-bordered w-full"
				placeholder="Skriv in din text här..."
				rows="4"
				required
			/>
		</div>

		<div class="divider divider-vertical">
			<span>Engelska</span>
		</div>

		<div class="form-control">
			<label for="title-en" class="label"><span class="label-text">Titel</span></label>
			<input
				type="text"
				name="title-en"
				placeholder="Some amazing title..."
				class="input input-bordered"
				required
			/>
		</div>

		<div>
			<label for="body-en" class="label"><span class="label-text">Body</span></label>
			<textarea
				name="body-en"
				class="textarea textarea-bordered w-full"
				placeholder="Enter the story of a lifetime..."
				rows="4"
				required
			/>
		</div>

		<button type="submit" class="btn btn-secondary">Preview</button>

		<button type="submit" class="btn btn-primary">Post</button>
	</form>
</Section>

<div class="max-w-3xl mx-auto my-12" />
