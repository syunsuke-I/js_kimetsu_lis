import * as utils from './utils.js';

const domain = "https://ihatov08.github.io/";
const baseUrl = `${domain}kimetsu_api/api`
const urls = {
  all: `${baseUrl}/all.json`,
  hashira: `${baseUrl}/hashira.json`,
  oni: `${baseUrl}/oni.json`,
  kisatsutai: `${baseUrl}/kisatsutai.json`,
};

/**
 * ウィンドウの読み込みが完了したら初期化として'all'ラジオボタンをクリックする。
 */
window.onload = () => {
  const radioButton = document.getElementById('all');
  if (radioButton) {
    radioButton.click();
  }
};

/**
 * 定義された全てのURLに対応するラジオボタンにデータフェッチのイベントリスナーを割り当てる。
 */
for (const id in urls) {
  assignCharacterFetchToRadioButton(id);
}

/**
 * ラジオボタンの変更イベントにキャラクターデータフェッチ処理を割り当てる。
 * @param {string} id - ラジオボタンのID。
 */
function assignCharacterFetchToRadioButton(id) {
  const radioButton = document.getElementById(id);
  if (radioButton) {
    radioButton.addEventListener('change', async function() {
      if (this.checked) {
        let characters = await characterDataFetcher(urls[id]);
        createCharacterCardContainer(characters);
      }
    });
  }
}

/**
 * 提供されたURLからキャラクターデータをフェッチする。
 * @async
 * @param {string} url - キャラクターデータをフェッチするURL。
 * @returns {Promise<Object[]>} キャラクターデータの配列を返すプロミス。
 */
async function characterDataFetcher(url) {
  try {
    utils.showLoadingIndicator();
    const response = await fetch(url);
    const characters = await response.json();
    utils.hideLoadingIndicator();
    return characters;
  } catch (error) {
    console.error('キャラクターデータの取得エラー:', error);
    utils.hideLoadingIndicator();
  }
}

/**
 * キャラクターカードを格納するコンテナを作成して配置する。
 * @param {Object[]} characters - キャラクターデータオブジェクトの配列。
 */
function createCharacterCardContainer(characters){
  const cardsContainer = document.getElementById('cards-container');
  cardsContainer.innerHTML = ''; // コンテナをクリア

  for (const character_data of characters) {
    const card = createCharacterCard(character_data);
    cardsContainer.appendChild(card);
  }
} 

/**
 * キャラクターのカード要素を作成する。
 * @param {Object} character - キャラクターデータオブジェクト。
 * @returns {HTMLElement} キャラクターのカード要素。
 */
function createCharacterCard(character) {
  // カードコンテナの作成
  const card = document.createElement('div');
  card.className = "max-w-sm rounded overflow-hidden shadow-lg bg-white m-4 flex-grow";

  // 画像の挿入
  const image = document.createElement('img');
  image.className = "w-full";
  image.src = `${domain}${character.image}`;
  image.alt = character.name;
  card.appendChild(image);

  // テキストコンテンツコンテナの作成
  const contentContainer = document.createElement('div');
  contentContainer.className = "px-6 py-4";
  
  // 名前の挿入
  const nameElement = document.createElement('div');
  nameElement.className = "font-bold text-xl mb-2";
  nameElement.textContent = `名前 : ${character.name}`;
  contentContainer.appendChild(nameElement);

  // カテゴリーの挿入
  const categoryElement = document.createElement('p');
  categoryElement.className = "text-gray-700 text-base";
  categoryElement.textContent = `カテゴリー : ${character.category}`;
  contentContainer.appendChild(categoryElement);

  // コンテンツコンテナをカードに挿入
  card.appendChild(contentContainer);

  return card;
}
