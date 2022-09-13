import type {
	UiNode,
	UiNodeAnchorAttributes,
	UiNodeAttributes,
	UiNodeImageAttributes,
	UiNodeInputAttributes,
	UiNodeScriptAttributes,
	UiNodeTextAttributes
} from '@ory/kratos-client';

export const getNodeLabel = (node: UiNode): string => {
	const attributes = node.attributes;
	if (isUiNodeAnchorAttributes(attributes)) {
		return attributes.title.text;
	}

	if (isUiNodeImageAttributes(attributes)) {
		return node.meta.label?.text || '';
	}

	if (isUiNodeInputAttributes(attributes)) {
		if (attributes.label?.text) {
			return attributes.label.text;
		}
	}

	return node.meta.label?.text || '';
};

export function isUiNodeAnchorAttributes(
	attrs: UiNodeAttributes
): attrs is UiNodeAnchorAttributes {
	return attrs.node_type === 'a';
}

export function isUiNodeImageAttributes(
	attrs: UiNodeAttributes
): attrs is UiNodeImageAttributes {
	return attrs.node_type === 'img';
}

export function isUiNodeInputAttributes(
	attrs: UiNodeAttributes
): attrs is UiNodeInputAttributes {
	return attrs.node_type === 'input';
}

export function isUiNodeTextAttributes(
	attrs: UiNodeAttributes
): attrs is UiNodeTextAttributes {
	return attrs.node_type === 'text';
}

export function isUiNodeScriptAttributes(
	attrs: UiNodeAttributes
): attrs is UiNodeScriptAttributes {
	return attrs.node_type === 'script';
}

export function getNodeId({ attributes }: UiNode) {
	if (isUiNodeInputAttributes(attributes)) {
		return attributes.name;
	} else {
		return attributes.id;
	}
}
