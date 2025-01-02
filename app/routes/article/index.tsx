import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [{ title: "Rasli" }, { name: "description", content: "Selamat datang di rasli!" }];
};

export default function Page() {
	return (
		<main className="min-h-[calc(100svh-72px)]">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at metus feugiat,
				pellentesque lacus sit amet, gravida sem. Suspendisse ac mi sed nisl consequat lacinia at ut
				tellus. Vivamus ornare elit et scelerisque venenatis. Suspendisse potenti. Suspendisse eu
				accumsan ligula, non pulvinar velit. Pellentesque sed purus ut dolor pellentesque aliquet et
				at tellus. Fusce dolor ex, pellentesque nec scelerisque vel, congue ut sapien. Suspendisse
				non viverra ante. Suspendisse potenti. Cras imperdiet enim ut diam tempus, et aliquet orci
				euismod. Nulla neque erat, vulputate venenatis suscipit ac, commodo in arcu. Vestibulum ante
				ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque et tristique
				ex.
			</p>
			<p>
				Curabitur nec pulvinar ex. Quisque ac iaculis ex. Nunc elementum vel augue quis auctor.
				Pellentesque non mi pharetra, maximus justo sed, sagittis felis. Nunc condimentum pulvinar
				orci et fringilla. Phasellus tempus arcu sit amet purus placerat placerat. Vestibulum
				suscipit eleifend enim, ac viverra quam. Morbi sollicitudin dapibus mattis. Integer eu diam
				auctor, lobortis mauris ut, pharetra tellus. Pellentesque in convallis diam. Nam sit amet
				arcu ut felis aliquam maximus. Praesent auctor viverra dolor, at suscipit quam porta quis.
			</p>
			<p>
				Quisque at urna eros. Sed vitae felis ac dolor volutpat vulputate quis eget eros.
				Suspendisse imperdiet mi non nisl pharetra dapibus. Donec aliquam dui iaculis dui gravida,
				eu fermentum magna semper. Vestibulum fringilla mattis porta. Cras vel metus dapibus,
				molestie risus at, mattis eros. Donec vel mi in mauris feugiat dictum fringilla nec sem.
				Mauris feugiat, turpis et posuere consectetur, felis enim gravida felis, sit amet pharetra
				justo orci vel eros.
			</p>
			<p>
				Praesent pellentesque fringilla dolor, at blandit sapien suscipit semper. Cras ut odio vitae
				sem posuere finibus. Vestibulum nec augue in libero ultrices ultricies. Nunc porttitor felis
				id eros euismod tincidunt. Nunc bibendum interdum enim, eu dictum eros tristique et. Nulla
				egestas, sem a sodales pulvinar, odio lectus tempus libero, et consequat arcu felis eget
				erat. Phasellus viverra condimentum mi et sollicitudin.
			</p>
			<p>
				Maecenas dignissim massa euismod sapien porttitor dictum. Nam urna eros, viverra sed dolor
				at, luctus facilisis massa. Proin bibendum vitae sem sit amet aliquam. Maecenas consequat
				eros lorem, ac elementum dui dictum ut. Etiam dignissim sem quis dignissim dapibus. Etiam
				facilisis posuere volutpat. Suspendisse eu orci sed ex porttitor viverra. Pellentesque
				sapien magna, bibendum id congue eu, rhoncus in sapien. Integer molestie mi arcu, vitae
				dignissim ante venenatis non.
			</p>
		</main>
	);
}
