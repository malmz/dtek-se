<script lang="ts">
	import Section from '$lib/components/Section.svelte';
</script>

<Section prose>
	<h1>Evenemang</h1>
	<a href="/news/create" class="link">Crate</a>
	<p>Här kan man se nyheter och kommande evenemang. När det blir implementerat</p>
</Section>

<Section>
	<div class="card bg-primary text-primary-content shadow-md">
		<div class="card-body ">
			<h2 class="card-title">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 fill-primary-content"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
						clip-rule="evenodd"
					/>
				</svg>
				Example event
				<div class="badge badge-secondary">NEW</div>
			</h2>
			<p class="line-clamp-2">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta excepturi optio ab quaerat
				repellendus! Voluptates, vero aperiam! Deleniti facilis perferendis provident qui numquam
				quod quidem aliquam reprehenderit nam, itaque tempora.
			</p>
		</div>
	</div>
</Section>
