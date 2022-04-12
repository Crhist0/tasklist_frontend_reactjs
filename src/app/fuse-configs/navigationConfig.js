import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'Aplicações',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'task-component',
        title: 'Tarefas',
        translate: 'Tarefas',
        type: 'item',
        icon: 'sticky_note_2',
        url: '/tasks',
      },
    ],
  },
  {
    id: 'divider-component',
    type: 'divider',
  },
  {
    id: 'logout',
    title: 'Logout',
    translate: 'Logout',
    type: 'item',
    icon: 'exit_to_app',
    url: '/logout',
  },
];

export default navigationConfig;
