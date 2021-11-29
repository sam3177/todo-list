import {
	generateProject,
	app,
	collection,
	field,
	relation,
	shortcuts,
	sharedModel,
	GeneratorKind,
	faker,
} from '../utils';

export const Todos = collection({
	id: 'Todos',
  representedBy:'title',
	mock: {
		count: 10,
	},
	fields: [ field.string('title'), field.boolean('isDone'),
...shortcuts.fields.timestampable() ],
	relations: [
		...shortcuts.relations.blameable()
	],
});
