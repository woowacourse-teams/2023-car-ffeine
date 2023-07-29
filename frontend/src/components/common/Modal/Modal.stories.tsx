import type { Meta } from '@storybook/react';

import { useState } from 'react';

import Button from '@common/Button';
import Text from '@common/Text';

import type { ModalProps } from './Modal';
import Modal from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

export const TriggeredByButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button outlined size="md" onClick={() => setIsModalOpen(true)}>
        모달 열기
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Text>버튼으로 모달을 열어봤어요</Text>
      </Modal>
    </>
  );
};

export const LongModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button outlined size="md" onClick={() => setIsModalOpen(true)}>
        모달 열기
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Text variant={'body'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod ultrices elit vitae
          pharetra. Vestibulum volutpat molestie viverra. Pellentesque libero mauris, tristique et
          tortor luctus, volutpat aliquet urna. Nunc ut urna enim. Morbi maximus, mi ac sollicitudin
          fermentum, massa nunc dapibus est, in pellentesque lacus est in massa. Curabitur et
          elementum metus, non hendrerit est. Curabitur venenatis id leo in dapibus. Duis in ipsum
          quis enim aliquam ornare. Cras in elementum augue. Donec tincidunt nisi nec neque maximus
          eleifend. Donec finibus vitae magna ut volutpat. Mauris vitae finibus eros, nec
          sollicitudin mi. Cras vitae nisi vel mi consequat sagittis. Nulla eget arcu vel velit
          sodales venenatis in eu arcu. Duis et cursus nisl, ac fermentum enim. Ut posuere bibendum
          ligula eu sagittis. Curabitur imperdiet rhoncus leo, nec faucibus eros tempus vel.
          Pellentesque ut eros in mi porta ultricies. Mauris viverra dolor sit amet enim elementum,
          eu consectetur dui interdum. Donec in malesuada nisi, vitae congue lorem. Sed lacinia ante
          arcu, quis hendrerit mauris condimentum ac. Pellentesque non dapibus justo, sit amet
          sollicitudin nibh. Quisque vitae lorem sed lorem rutrum elementum sed sed tortor. Proin
          fermentum tellus sed iaculis aliquam. Suspendisse in quam non dui varius dictum sit amet
          et nisi. In facilisis neque arcu, a mattis felis aliquam non. Sed id nisl non tortor
          placerat interdum et sit amet ipsum. Aliquam volutpat sed nisl sit amet blandit. Ut sit
          amet lacus nibh. Aliquam tristique, tortor a bibendum mollis, nunc magna dictum purus,
          venenatis mattis orci quam in lorem. Fusce suscipit pretium nunc, id egestas magna dapibus
          sed. Nam quis felis quis mauris condimentum consectetur tristique id lacus. Aliquam sed
          dui vel nulla consequat iaculis. Praesent feugiat quam in accumsan laoreet. Aliquam cursus
          arcu neque, porta fringilla urna suscipit eleifend. Ut rutrum erat eu mauris eleifend
          ultricies vitae ac tortor. Suspendisse consequat aliquet mi imperdiet gravida. Vivamus
          iaculis urna mauris, ac efficitur ligula aliquet suscipit. Mauris accumsan laoreet nisi,
          eu suscipit mauris interdum imperdiet. Donec viverra libero sit amet leo mollis, eget
          pulvinar ligula lobortis. Nullam nec viverra lorem. Duis faucibus odio enim, vel finibus
          neque sollicitudin a. Phasellus venenatis viverra ex, ac tempor ante. In egestas erat vel
          nisl dictum ornare. Aliquam ultricies purus turpis, a faucibus quam feugiat vel. Duis at
          elementum sem. Proin condimentum, quam eu consequat posuere, leo nibh commodo eros, at
          suscipit diam diam non urna. Ut mollis ultricies diam, a tempus nisl mollis at.
          Suspendisse potenti. Nulla blandit rhoncus consectetur. Nam viverra velit ut aliquam
          iaculis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Donec tincidunt nunc erat, ac iaculis metus varius a. Duis feugiat semper blandit.
          Curabitur lobortis dignissim fermentum. Nunc nec nisl dui. Praesent tincidunt elit non
          hendrerit accumsan. Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Nullam quis enim sed lorem tempus interdum. Nunc rhoncus lacinia
          felis non scelerisque. Pellentesque iaculis fringilla lorem, et mollis dui sodales quis.
          Vivamus ornare sapien eu ullamcorper porttitor. Duis hendrerit nibh odio, bibendum
          placerat ipsum commodo tempor. Nam turpis tortor, sollicitudin in pretium a, consequat a
          magna. Nam bibendum lacinia nulla id vestibulum. Curabitur id enim leo. Maecenas
          consectetur, lorem eu iaculis dapibus, ex diam lobortis risus, eget lobortis dolor ante
          rhoncus ex. Nullam quis nibh sed nunc gravida volutpat a et ligula. Sed sit amet venenatis
          purus. Nullam pulvinar leo sit amet augue fermentum fermentum. Ut vel interdum mi. Duis
          sapien nisl, consequat ut nisi eu, dignissim auctor odio. Nullam elementum lacus vitae
          scelerisque fringilla. Morbi ultricies pellentesque vulputate. Sed laoreet lacus non elit
          condimentum, eget tristique dui imperdiet. Ut dictum ex eu convallis aliquam. Nulla
          tristique, nibh a gravida congue, nisi ligula faucibus urna, ut mollis dui lectus quis
          massa. Fusce vel tellus sit amet lacus molestie egestas vel nec metus. Nullam facilisis
          euismod sollicitudin. Ut vel vulputate nisi. Aliquam sed convallis arcu. Duis eros velit,
          molestie vel turpis pellentesque, sollicitudin egestas enim. Donec faucibus finibus
          egestas. Curabitur molestie velit vel viverra semper. Maecenas non lacus varius, semper
          augue sed, fringilla lorem. Vestibulum mattis egestas porta. Nullam at leo molestie,
          placerat magna blandit, sollicitudin eros. Aliquam lorem nisl, suscipit nec nisi vitae,
          ultrices pretium est. Pellentesque non est ultricies, tincidunt orci ac, sagittis arcu.
          Maecenas eget odio ut velit interdum tristique eu quis libero. Suspendisse efficitur diam
          sem, lacinia mattis magna auctor tincidunt. Morbi rhoncus nec elit ac molestie. Vestibulum
          facilisis arcu quis accumsan aliquet. Cras ullamcorper laoreet tempor. Nam ipsum leo,
          eleifend eget lectus nec, fermentum facilisis lacus. Ut egestas neque ac nulla ultricies
          semper. Cras condimentum, nisi sed euismod commodo, justo orci iaculis metus, vitae
          porttitor ipsum turpis at tortor. Integer fermentum vestibulum mauris quis venenatis.
          Integer in sollicitudin est. Vivamus nec augue vel ante sagittis mattis. Duis nulla nibh,
          imperdiet in porttitor vitae, hendrerit aliquet sem. Proin blandit vehicula tellus ac
          cursus. Proin nec euismod justo. Ut nec euismod nunc. Quisque fermentum tristique lorem,
          sit amet lacinia elit tempor eget. Proin dignissim purus eget odio elementum facilisis.
          Mauris aliquam, dolor at tincidunt volutpat, felis velit sollicitudin nunc, a porttitor
          ligula dui tempor ex. Donec at turpis vitae elit aliquam facilisis convallis in neque.
          Fusce volutpat eget lacus vulputate feugiat. Mauris vel turpis hendrerit lorem lobortis
          dictum ultrices dapibus orci. Suspendisse euismod vehicula volutpat. Nulla malesuada
          faucibus felis ac finibus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Integer fermentum a elit quis interdum. Maecenas at neque
          ultrices, dapibus sem sed, faucibus urna. Sed sagittis nulla sed ultrices consequat. Nunc
          auctor, purus ultricies condimentum pretium, ante tortor auctor massa, id ornare tortor
          diam quis lacus. Cras dictum orci a arcu dignissim pulvinar. Donec ac lectus ac velit
          volutpat lobortis. Curabitur et laoreet risus. Mauris efficitur volutpat blandit.
          Phasellus pharetra ac mi ultrices vehicula. Nullam cursus neque sed est ultricies, vel
          iaculis metus pellentesque. Curabitur sit amet risus convallis nisi faucibus pulvinar eget
          sit amet nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames
          ac turpis egestas. Aliquam sit amet euismod massa, non cursus odio. Vestibulum arcu nulla,
          accumsan vel ligula vitae, tempus suscipit nulla. Nullam at bibendum dui, interdum
          ultricies tellus. Nullam vel lacus et sapien sodales lacinia. In posuere enim nec egestas
          imperdiet. Maecenas in egestas purus. Ut hendrerit suscipit eros sed ornare. Nullam a mi
          et justo dictum aliquam. Quisque a laoreet massa. Pellentesque laoreet risus ut augue
          pulvinar faucibus. Maecenas eu dignissim arcu, quis egestas magna. Sed volutpat est leo,
          eu sollicitudin metus aliquam et. In purus purus, vulputate quis magna eu, sodales maximus
          nisl. Phasellus fringilla ut lorem volutpat sodales. Nam fermentum auctor dolor sed
          blandit. Praesent consectetur ligula in massa dictum, quis euismod nisi mattis. Quisque
          tincidunt mollis tempus. Ut vehicula leo diam, nec sollicitudin nunc maximus at. Nunc
          turpis sapien, faucibus vitae posuere in, malesuada id massa. Ut laoreet dictum velit ac
          sagittis. Integer ac blandit felis, ac porta nulla. Cras placerat efficitur lacus vitae
          egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Aliquam sed maximus justo. Sed viverra posuere nisl vitae facilisis. Sed interdum
          massa nulla, malesuada finibus nisl elementum lobortis. In finibus finibus odio ut
          porttitor. Donec pellentesque massa non faucibus imperdiet. Donec eget turpis cursus,
          commodo quam quis, dapibus velit. Maecenas hendrerit arcu sed tincidunt tincidunt.
          Phasellus lobortis ultricies augue, et volutpat arcu feugiat quis. Integer maximus, justo
          at ultrices sagittis, tortor nibh accumsan sapien, lacinia rhoncus elit elit ac lorem. In
          at fermentum mauris. In maximus consectetur risus, quis posuere lectus lacinia et.
          Curabitur suscipit ex nec dui vestibulum, sit amet placerat velit varius. Donec ultrices,
          nisl sed pellentesque aliquet, mi sem porta ipsum, a placerat nulla lorem at nunc. Nullam
          et tristique massa. Praesent a nisi vehicula erat consectetur interdum sodales non magna.
          Vestibulum faucibus, nunc id suscipit pulvinar, purus nisl commodo mi, non posuere lorem
          est quis enim. Vivamus vel elit malesuada turpis consequat aliquet ac et massa. Fusce
          iaculis eget massa eget convallis. Vestibulum consequat sollicitudin leo, in lobortis
          sapien consequat eu. In congue at erat eu convallis. Curabitur id interdum ipsum. Nulla
          varius gravida accumsan. Nam lobortis ornare tincidunt. Aliquam rhoncus purus id lacus
          faucibus, ac congue justo pellentesque. Cras luctus mauris non nisl posuere pulvinar.
          Pellentesque feugiat, dui vitae euismod euismod, urna nulla eleifend lectus, a pretium
          risus est vitae augue. Integer pulvinar metus a magna bibendum, at egestas ex posuere.
          Quisque in sodales nulla, ac vestibulum enim. Praesent sed urna purus. Nullam non mollis
          neque, ut venenatis ligula. Nulla facilisi. Nulla accumsan pharetra venenatis. Proin
          mollis suscipit massa, id viverra augue fermentum sit amet. Aliquam malesuada neque sit
          amet lorem varius tincidunt. Quisque elit dolor, finibus vestibulum metus non, convallis
          blandit eros. Sed gravida nec dolor quis euismod. Quisque nec sem orci. Sed varius
          faucibus justo in accumsan. Nam quis est vel sapien vulputate feugiat semper a augue.
          Suspendisse potenti. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Curabitur id pretium magna. Aenean a est justo. Vestibulum diam diam, porttitor vitae
          tellus non, fermentum cursus turpis. Vivamus eu eros nisi. Suspendisse hendrerit risus a
          ex egestas, eu consectetur ante fermentum. Ut vel justo sit amet odio lacinia pulvinar sed
          ac nibh. Vivamus vulputate ipsum ante, eget iaculis ex tincidunt ac. Sed semper tellus
          interdum tristique tempor. Proin massa arcu, ullamcorper interdum nisl sed, aliquam
          commodo ligula. Morbi vel metus fermentum, molestie quam ac, ullamcorper ante. Nam
          fermentum metus vel egestas molestie. In eget lacus gravida ligula eleifend fringilla sit
          amet quis libero. Nunc vehicula vulputate ante, vitae elementum elit ullamcorper quis.
          Donec vel felis id urna ultricies viverra. Proin sed diam vel ex vehicula tempus at quis
          risus. Donec mollis nisi sed leo tincidunt, non faucibus enim mattis. Ut aliquam fermentum
          neque, a porttitor ex consequat et. Ut congue libero volutpat, iaculis mauris in,
          consequat diam. Vivamus vel ullamcorper lectus. Aliquam lectus felis, sollicitudin sed
          faucibus vitae, lacinia id sapien. Aliquam lobortis aliquet metus, condimentum ornare mi
          vestibulum at. Nullam pulvinar ac est vel egestas. Quisque varius ex sem, sit amet tempus
          metus rhoncus id. Aliquam suscipit nibh nulla, ut volutpat velit feugiat in. Mauris
          aliquam neque vel mi vehicula euismod. Vivamus vehicula turpis sed nulla malesuada tempor.
          Maecenas interdum scelerisque accumsan. Duis eu mattis nunc, id lacinia tortor. Maecenas
          hendrerit condimentum libero a scelerisque. Donec eros enim, volutpat nec fermentum id,
          facilisis fringilla erat. Donec vel ipsum lobortis, porttitor velit sed, pulvinar justo.
          Proin interdum magna accumsan ligula porttitor commodo. Curabitur sollicitudin sed orci ac
          ullamcorper. Nullam non felis at mauris porttitor varius a vel velit. Integer id nunc
          turpis. Integer tempus odio at enim efficitur, sed maximus arcu feugiat. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Morbi laoreet mauris sed malesuada
          ultrices. Vivamus lacinia lacus nec velit elementum condimentum. Sed eleifend tristique
          dolor quis egestas. Proin vehicula volutpat nisi et rutrum. Nullam venenatis molestie
          viverra. Maecenas felis neque, luctus sit amet tincidunt vitae, euismod sed sem. Nunc
          volutpat mollis urna, at laoreet odio viverra non. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Donec sed lectus lorem. Proin
          volutpat diam nibh, eu lacinia neque euismod a.
        </Text>
      </Modal>
    </>
  );
};
