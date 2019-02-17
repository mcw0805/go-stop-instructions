let body = d3.select('body');
let bombExDiv = body.select('#bombEx');
let bombExSvgContainer = createSvgElement(body, 'bombEx');
addAllCardsAsPattern();

drawFloorSections(bombExSvgContainer, bombExDiv);
drawCenterRemainingDeck(bombExSvgContainer, 'b');
createBombExample(bombExSvgContainer);
function createBombExample(svgContainer) {
    // opponent card
    drawHandCardFaceDownSvg(svgContainer, 6)

    //drawCollectionCard(svgElement, rank, cardPatternId, cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix="") {

    // collection cards for opponent
    drawCollectionCard(svgContainer, 1, '_6_1', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='b')
    drawCollectionCard(svgContainer, 1, '_2_1', cardPosWithin=1, currPlayer=false, piLevel=0, groupIdSuffix='b')
    drawCollectionCard(svgContainer, 1, '_7_1', cardPosWithin=2, currPlayer=false, piLevel=0, groupIdSuffix='b')

    drawCollectionCard(svgContainer, 2, '_6_2', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='b')
    drawCollectionCard(svgContainer, 2, '_5_2', cardPosWithin=1, currPlayer=false, piLevel=0, groupIdSuffix='b')
    drawCollectionCard(svgContainer, 2, '_6_2', cardPosWithin=2, currPlayer=false, piLevel=0, groupIdSuffix='b')

    drawCollectionCard(svgContainer, 3, '_2_3', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='b')
    drawCollectionCard(svgContainer, 3, '_7_3', cardPosWithin=1, currPlayer=false, piLevel=0, groupIdSuffix='b')
    drawCollectionCard(svgContainer, 3, '_2_4', cardPosWithin=2, currPlayer=false, piLevel=0, groupIdSuffix='b')
    drawCollectionCard(svgContainer, 3, '_5_4', cardPosWithin=3, currPlayer=false, piLevel=0, groupIdSuffix='b')



    // collection card for curr player
    drawCollectionCard(svgContainer, 0, '_1_1', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='b')
    drawCollectionCard(svgContainer, 0, '_8_1', cardPosWithin=1, currPlayer=true, piLevel=0, groupIdSuffix='b')

    drawCollectionCard(svgContainer, 1, '_9_1', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='b')
    drawCollectionCard(svgContainer, 1, '_8_2', cardPosWithin=1, currPlayer=true, piLevel=0, groupIdSuffix='b')

    drawCollectionCard(svgContainer, 2, '_6_2', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='b')
    drawCollectionCard(svgContainer, 2, '_5_2', cardPosWithin=1, currPlayer=true, piLevel=0, groupIdSuffix='b')
    drawCollectionCard(svgContainer, 2, '_6_2', cardPosWithin=2, currPlayer=true, piLevel=0, groupIdSuffix='b')

    drawCollectionCard(svgContainer, 3, '_9_4', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='b')
    drawCollectionCard(svgContainer, 3, '_3_4', cardPosWithin=1, currPlayer=true, piLevel=0, groupIdSuffix='b')
    drawCollectionCard(svgContainer, 3, '_10_4', cardPosWithin=2, currPlayer=true, piLevel=0, groupIdSuffix='b')
    
    // floor cards
    drawFloorCard(svgContainer, '_11_2', floorPos=1, cardPosWithin=0,groupIdSuffix='b')
    drawFloorCard(svgContainer, '_6_1', floorPos=2, cardPosWithin=0,groupIdSuffix='b') 
    drawFloorCard(svgContainer, '_10_1', floorPos=3,cardPosWithin=0, groupIdSuffix='b') 
    drawFloorCard(svgContainer, '_8_1', floorPos=4, cardPosWithin=0,groupIdSuffix='b') 

    // curr player hand card
    drawHandCardForCurrPlayer(svgContainer, '_7_2', position=0, groupIdSuffix='b') 
    drawHandCardForCurrPlayer(svgContainer, '_11_1', position=1, groupIdSuffix='b') 
    drawHandCardForCurrPlayer(svgContainer, '_11_3', position=2, groupIdSuffix='b')  
    drawHandCardForCurrPlayer(svgContainer, '_11_4', position=3, groupIdSuffix='b') 
    drawHandCardForCurrPlayer(svgContainer, '_12_1', position=4, groupIdSuffix='b') 
    drawHandCardForCurrPlayer(svgContainer, '_12_2', position=5, groupIdSuffix='b') 

    outlineCardGroup('_11_1', groupIdSuffix='b') 
    outlineCardGroup('_11_3', groupIdSuffix='b') 
    outlineCardGroup('_11_4', groupIdSuffix='b') 
}

d3.select('#executeBtn').on('click', () => {
    // translate hand card to floor
    let fc1 = getFloorCoordinate(bombExSvgContainer, floorPos=1, cardPosWithin=1)
    let fc2 = getFloorCoordinate(bombExSvgContainer, floorPos=1, cardPosWithin=2)
    let fc3 = getFloorCoordinate(bombExSvgContainer, floorPos=1, cardPosWithin=3)
    translateG('_11_1', 'b', fc1['f_x'], fc1['f_y']);
    translateG('_11_3', 'b', fc2['f_x'], fc2['f_y']);
    translateG('_11_4', 'b', fc3['f_x'], fc3['f_y']);
    
    // flip and move cards to collection
    let centerCoord = getCenterCoord(bombExSvgContainer);
    setTimeout(() => {
        drawCardAsGroup(bombExSvgContainer, centerCoord['x'], centerCoord['y'], '_3_3', groupId='_3_3gb');
        let fcPos8 = getFloorCoordinate(bombExSvgContainer, floorPos=8, cardPosWithin=0);

        setTimeout(() => {
            translateG('_3_3', 'b', fcPos8['f_x'], fcPos8['f_y']);

            let cPos1 = getCollectionCardPos(0, 2); // 11_1
            let cPos2 = getCollectionCardPos(3, 0, piLevel=1); // 11_2
            let cPos3 = getCollectionCardPos(3, 3, piLevel=0); // 11_3
            let cPos4 = getCollectionCardPos(3, 4, piLevel=0); // 11_4
            
            
            translateG('_11_3', 'b', cPos3['c_x'], cPos3['c_y']);
            translateG('_11_4', 'b', cPos4['c_x'], cPos4['c_y']);
            translateG('_11_1', 'b', cPos1['c_x'], cPos1['c_y']);
            translateG('_11_2', 'b', cPos2['c_x'], cPos2['c_y']);

            outlineCardGroup('_11_1', groupIdSuffix='b', 'none')
            outlineCardGroup('_11_3', groupIdSuffix='b', 'none')
            outlineCardGroup('_11_4', groupIdSuffix='b', 'none')

            setTimeout(() => {
                let extortTo = getCollectionCardPos(3, 1, piLevel=1, currPlayer=true); 
                translateG('_5_4', 'b', extortTo['c_x'], extortTo['c_y']);
            }, 600);


        }, 1000); 

        
        
    }, 800);
    
});

///////// ttadak ///////////

let body = d3.select('body');
let ttadakExDiv = body.select('#ttadakEx');
let ttadakExSvgContainer = createSvgElement(body, 'ttadakEx');
addAllCardsAsPattern();

drawFloorSections(ttadakExSvgContainer, ttadakExDiv);
drawCenterRemainingDeck(ttadakExSvgContainer, 't');
createTtadakExample(ttadakExSvgContainer);
function createTtadakExample(svgContainer) {
    // opponent card
    drawHandCardFaceDownSvg(svgContainer, 8)


    //drawCollectionCard(svgElement, rank, cardPatternId, cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix="") {
    // floor cards
    drawFloorCard(svgContainer, '_5_1', floorPos=2,cardPosWithin=0, groupIdSuffix='t')
    drawFloorCard(svgContainer, '_7_3', floorPos=1, cardPosWithin=0,groupIdSuffix='t')
    drawFloorCard(svgContainer, '_7_4', floorPos=1, cardPosWithin=1,groupIdSuffix='t') 

    drawFloorCard(svgContainer, '_3_3', floorPos=3,cardPosWithin=0, groupIdSuffix='t') 
    drawFloorCard(svgContainer, '_11_3', floorPos=4,cardPosWithin=0, groupIdSuffix='t') 
    drawFloorCard(svgContainer, '_9_4', floorPos=6, cardPosWithin=0,groupIdSuffix='t') 
    // collection cards for opponent
    drawCollectionCard(svgContainer, 0, '_11_1', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='t')
    
    drawCollectionCard(svgContainer, 1, '_9_1', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='t')

    drawCollectionCard(svgContainer, 2, '_5_2', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='t')
    drawCollectionCard(svgContainer, 2, '_9_2', cardPosWithin=1, currPlayer=false, piLevel=0, groupIdSuffix='t')

    drawCollectionCard(svgContainer, 3, '_11_2', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='t')
    drawCollectionCard(svgContainer, 3, '_5_4', cardPosWithin=1, currPlayer=false, piLevel=0, groupIdSuffix='t')


    // collection for current player
    drawCollectionCard(svgContainer, 2, '_2_2', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='t')
    drawCollectionCard(svgContainer, 2, '_6_2', cardPosWithin=1, currPlayer=true, piLevel=0, groupIdSuffix='t')

    drawCollectionCard(svgContainer, 3, '_2_3', cardPosWithin=3, currPlayer=true, piLevel=0, groupIdSuffix='t')
    drawCollectionCard(svgContainer, 3, '_6_3', cardPosWithin=4, currPlayer=true, piLevel=0, groupIdSuffix='t')
    
    // curr player hand card
    drawHandCardForCurrPlayer(svgContainer, '_1_1', position=0, groupIdSuffix='t') 
    drawHandCardForCurrPlayer(svgContainer, '_4_1', position=1, groupIdSuffix='t') 
    drawHandCardForCurrPlayer(svgContainer, '_4_2', position=2, groupIdSuffix='t') 
    drawHandCardForCurrPlayer(svgContainer, '_6_1', position=3, groupIdSuffix='t') 
    drawHandCardForCurrPlayer(svgContainer, '_7_2', position=4, groupIdSuffix='t') 
    drawHandCardForCurrPlayer(svgContainer, '_8_3', position=5, groupIdSuffix='t') 
    drawHandCardForCurrPlayer(svgContainer, '_10_1', position=6, groupIdSuffix='t') 
    drawHandCardForCurrPlayer(svgContainer, '_12_3', position=7, groupIdSuffix='t') 




    outlineCardGroup('_7_2', groupIdSuffix='t') 

}

d3.select('#executeBtn').on('click', () => {
    // translate hand card to floor
    let fc1 = getFloorCoordinate(ttadakExSvgContainer, floorPos=1, cardPosWithin=0)

    translateG('_7_2', 't', fc1['f_x'] - gridLeftRightPadding, fc1['f_y'] + gridTopBottomPadding);
    
    // flip and move cards to collection
    let centerCoord = getCenterCoord(ttadakExSvgContainer);
    setTimeout(() => {
        drawCardAsGroup(ttadakExSvgContainer, centerCoord['x'], centerCoord['y'], '_7_1', groupId='_7_1gt');
        let fcPos1 = getFloorCoordinate(ttadakExSvgContainer, floorPos=1, cardPosWithin=1);

        setTimeout(() => {
            translateG('_7_1', 't', fcPos1['f_x'] + gridLeftRightPadding, fcPos1['f_y'] + gridTopBottomPadding);

        
            setTimeout(() => {
                let cPos1 = getCollectionCardPos(1, 0); // 7_1
                let cPos2 = getCollectionCardPos(2, 2, piLevel=0); // 7_2
                let cPos3 = getCollectionCardPos(3, 0, piLevel=0); // 7_3
                let cPos4 = getCollectionCardPos(3, 1, piLevel=0); // 7_4
                
                translateG('_7_1', 't', cPos1['c_x'], cPos1['c_y']);
                translateG('_7_2', 't', cPos2['c_x'], cPos2['c_y']);
                translateG('_7_3', 't', cPos3['c_x'], cPos3['c_y']);
                translateG('_7_4', 't', cPos4['c_x'], cPos4['c_y']);

                outlineCardGroup('_7_2', groupIdSuffix='t', 'none')
                setTimeout(() => {
                    let extortTo = getCollectionCardPos(3, 2, piLevel=0, currPlayer=true); 
                    translateG('_5_4', 't', extortTo['c_x'], extortTo['c_y']);

                }, 600);
            }, 600);


        }, 1000); 

        
    }, 800);
    
});

/////// sseul ///// 
let body = d3.select('body');
let sseulExDiv = body.select('#sseulEx');
let sseulExSvgContainer = createSvgElement(body, 'sseulEx');
addAllCardsAsPattern();

drawFloorSections(sseulExSvgContainer, sseulExDiv);
drawCenterRemainingDeck(sseulExSvgContainer, 's');
createTtadakExample(sseulExSvgContainer);
function createTtadakExample(svgContainer) {
    // opponent card
    drawHandCardFaceDownSvg(svgContainer, 8)


    // collection for current player
    drawCollectionCard(svgContainer, 0, '_12_1', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='s')

    drawCollectionCard(svgContainer, 1, '_5_1', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='s')
    drawCollectionCard(svgContainer, 1, '_4_1', cardPosWithin=1, currPlayer=true, piLevel=0, groupIdSuffix='s')

    drawCollectionCard(svgContainer, 2, '_5_2', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='s')
    drawCollectionCard(svgContainer, 2, '_4_2', cardPosWithin=1, currPlayer=true, piLevel=0, groupIdSuffix='s')

    drawCollectionCard(svgContainer, 3, '_12_4', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='s')
    drawCollectionCard(svgContainer, 3, '_4_3', cardPosWithin=1, currPlayer=true, piLevel=0, groupIdSuffix='s')
    drawCollectionCard(svgContainer, 3, '_4_4', cardPosWithin=2, currPlayer=true, piLevel=0, groupIdSuffix='s')
    
    // floor cards
    drawFloorCard(svgContainer, '_2_3', floorPos=2, cardPosWithin=0,groupIdSuffix='s')
    drawFloorCard(svgContainer, '_10_3', floorPos=1,cardPosWithin=0, groupIdSuffix='s')

    // collection cards for opponent
    drawCollectionCard(svgContainer, 0, '_8_1', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='s')

    drawCollectionCard(svgContainer, 1, '_2_1', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='s')
    drawCollectionCard(svgContainer, 1, '_6_1', cardPosWithin=1, currPlayer=false, piLevel=0, groupIdSuffix='s')

    drawCollectionCard(svgContainer, 2, '_3_2', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='s')
    drawCollectionCard(svgContainer, 2, '_9_2', cardPosWithin=1, currPlayer=false, piLevel=0, groupIdSuffix='s')

    drawCollectionCard(svgContainer, 3, '_8_3', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='s')
    drawCollectionCard(svgContainer, 3, '_2_4', cardPosWithin=1, currPlayer=false, piLevel=0, groupIdSuffix='s')
    drawCollectionCard(svgContainer, 3, '_9_3', cardPosWithin=2, currPlayer=false, piLevel=0, groupIdSuffix='s')
    drawCollectionCard(svgContainer, 3, '_6_4', cardPosWithin=3, currPlayer=false, piLevel=0, groupIdSuffix='s')
    drawCollectionCard(svgContainer, 3, '_3_4', cardPosWithin=4, currPlayer=false, piLevel=0, groupIdSuffix='s')


    
    // curr player hand card
    drawHandCardForCurrPlayer(svgContainer, '_1_4', position=0, groupIdSuffix='s') 
    drawHandCardForCurrPlayer(svgContainer, '_3_3', position=1, groupIdSuffix='s') 
    drawHandCardForCurrPlayer(svgContainer, '_7_1', position=2, groupIdSuffix='s') 
    drawHandCardForCurrPlayer(svgContainer, '_8_1', position=3, groupIdSuffix='s') 
    drawHandCardForCurrPlayer(svgContainer, '_9_1', position=4, groupIdSuffix='s') 
    drawHandCardForCurrPlayer(svgContainer, '_10_2', position=5, groupIdSuffix='s') 
    drawHandCardForCurrPlayer(svgContainer, '_11_2', position=6, groupIdSuffix='s') 


    outlineCardGroup('_10_2', groupIdSuffix='s') 

}

d3.select('#executeBtn').on('click', () => {
    // translate hand card to floor
    let fc1 = getFloorCoordinate(sseulExSvgContainer, floorPos=1, cardPosWithin=1)

    translateG('_10_2', 's', fc1['f_x'], fc1['f_y']);
    
    // flip and move cards to collection
    let centerCoord = getCenterCoord(sseulExSvgContainer);
    setTimeout(() => {
        drawCardAsGroup(sseulExSvgContainer, centerCoord['x'], centerCoord['y'], '_2_2', groupId='_2_2gs');
        let fcPos1 = getFloorCoordinate(sseulExSvgContainer, floorPos=2, cardPosWithin=1);

        setTimeout(() => {
            translateG('_2_2', 's', fcPos1['f_x'] , fcPos1['f_y']);

            setTimeout(() => {
                let cPos2 = getCollectionCardPos(2, 2, piLevel=0); // 2_2
                let cPos1 = getCollectionCardPos(2, 3, piLevel=0); // 10_2
                let cPos3 = getCollectionCardPos(3, 0, piLevel=1); // 2_3
                let cPos4 = getCollectionCardPos(3, 1, piLevel=1); // 10_3
                
                translateG('_10_2', 's', cPos2['c_x'], cPos2['c_y']);
                translateG('_2_2', 's', cPos1['c_x'], cPos1['c_y']);
                translateG('_2_3', 's', cPos3['c_x'], cPos3['c_y']);
                translateG('_10_3', 's', cPos4['c_x'], cPos4['c_y']);

                outlineCardGroup('_10_2', groupIdSuffix='s', 'none')
                setTimeout(() => {
                    let extortTo = getCollectionCardPos(3, 3, piLevel=0, currPlayer=true); 
                    translateG('_3_4', 's', extortTo['c_x'], extortTo['c_y']);

                }, 600);
            }, 600);


        }, 1000); 

        
    }, 800);
    
});

///// jjok ///// 
let body = d3.select('body');
let jjokDiv = body.select('#jjokEx');
let jjokExSvgContainer = createSvgElement(body, 'jjokEx');
addAllCardsAsPattern();

drawFloorSections(jjokExSvgContainer, jjokDiv);
drawCenterRemainingDeck(jjokExSvgContainer, 'j');
createTtadakExample(jjokExSvgContainer);
function createTtadakExample(svgContainer) {
    // opponent card
    drawHandCardFaceDownSvg(svgContainer, 7)

    // collection for current player
    drawCollectionCard(svgContainer, 0, '_1_1', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='j')

    drawCollectionCard(svgContainer, 1, '_7_1', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='j')
    drawCollectionCard(svgContainer, 1, '_9_1', cardPosWithin=1, currPlayer=true, piLevel=0, groupIdSuffix='j')

    drawCollectionCard(svgContainer, 2, '_6_2', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='j')
    drawCollectionCard(svgContainer, 2, '_7_2', cardPosWithin=1, currPlayer=true, piLevel=0, groupIdSuffix='j')
    drawCollectionCard(svgContainer, 2, '_9_2', cardPosWithin=2, currPlayer=true, piLevel=0, groupIdSuffix='j')

    drawCollectionCard(svgContainer, 3, '_1_3', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='j')
    drawCollectionCard(svgContainer, 3, '_6_3', cardPosWithin=1, currPlayer=true, piLevel=0, groupIdSuffix='j')

    // floor cards
    drawFloorCard(svgContainer, '_10_1', floorPos=3, cardPosWithin=0,groupIdSuffix='j')
    drawFloorCard(svgContainer, '_5_3', floorPos=4,cardPosWithin=0, groupIdSuffix='j')

    // collection cards for opponent
    drawCollectionCard(svgContainer, 0, '_12_1', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='j')
    drawCollectionCard(svgContainer, 1, '_8_1', cardPosWithin=1, currPlayer=false, piLevel=0, groupIdSuffix='j')

    drawCollectionCard(svgContainer, 1, '_12_1', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='j')
    drawCollectionCard(svgContainer, 1, '_8_1', cardPosWithin=1, currPlayer=false, piLevel=0, groupIdSuffix='j')
    drawCollectionCard(svgContainer, 1, '_5_1', cardPosWithin=2, currPlayer=false, piLevel=0, groupIdSuffix='j')
    drawCollectionCard(svgContainer, 1, '_6_1', cardPosWithin=3, currPlayer=false, piLevel=0, groupIdSuffix='j')

    drawCollectionCard(svgContainer, 2, '_4_2', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='j')

    drawCollectionCard(svgContainer, 3, '_5_3', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='j')
    drawCollectionCard(svgContainer, 3, '_6_4', cardPosWithin=1, currPlayer=false, piLevel=0, groupIdSuffix='j')
    drawCollectionCard(svgContainer, 3, '_4_3', cardPosWithin=2, currPlayer=false, piLevel=0, groupIdSuffix='j')
    
    // curr player hand card
    drawHandCardForCurrPlayer(svgContainer, '_2_1', position=0, groupIdSuffix='j') 
    drawHandCardForCurrPlayer(svgContainer, '_2_3', position=1, groupIdSuffix='j') 
    drawHandCardForCurrPlayer(svgContainer, '_3_1', position=2, groupIdSuffix='j') 
    drawHandCardForCurrPlayer(svgContainer, '_3_2', position=3, groupIdSuffix='j') 
    drawHandCardForCurrPlayer(svgContainer, '_4_4', position=4, groupIdSuffix='j') 
    drawHandCardForCurrPlayer(svgContainer, '_7_3', position=5, groupIdSuffix='j') 
    drawHandCardForCurrPlayer(svgContainer, '_11_2', position=6, groupIdSuffix='j') 

}

d3.select('#executeBtn').on('click', () => {
    // translate hand card to floor
    let fc1 = getFloorCoordinate(jjokExSvgContainer, floorPos=1, cardPosWithin=0)

    translateG('_7_3', 'j', fc1['f_x'], fc1['f_y']);
    
    // flip and move cards to collection
    let centerCoord = getCenterCoord(jjokExSvgContainer);
    setTimeout(() => {
        drawCardAsGroup(jjokExSvgContainer, centerCoord['x'], centerCoord['y'], '_7_4', groupId='_7_4gj');
        let fcPos1 = getFloorCoordinate(jjokExSvgContainer, floorPos=1, cardPosWithin=1);

        setTimeout(() => {
            translateG('_7_4', 'j', fcPos1['f_x'] , fcPos1['f_y']);

            setTimeout(() => {
                let cPos1 = getCollectionCardPos(3, 3, piLevel=0); // 7_3
                let cPos2 = getCollectionCardPos(3, 4, piLevel=0); // 7_4

                translateG('_7_3', 'j', cPos1['c_x'], cPos1['c_y']);
                translateG('_7_4', 'j', cPos2['c_x'], cPos2['c_y']);


                setTimeout(() => {
                    let extortTo = getCollectionCardPos(3, 2, piLevel=0, currPlayer=true); 
                    translateG('_4_3', 'j', extortTo['c_x'], extortTo['c_y']);

                }, 600);
            }, 600);


        }, 1000); 

        
    }, 800);
    
});

//// ppuk

let body = d3.select('body');
let ppukExDiv = body.select('#ppukEx');
let ppukExSvgContainer = createSvgElement(body, 'ppukEx');
addAllCardsAsPattern();

drawFloorSections(ppukExSvgContainer, ppukExDiv);
drawCenterRemainingDeck(ppukExSvgContainer, 'p');
createTtadakExample(ppukExSvgContainer);
function createTtadakExample(svgContainer) {
    // opponent card
    drawHandCardFaceDownSvg(svgContainer, 7)

    // floor cards
    drawFloorCard(svgContainer, '_1_2', floorPos=1,cardPosWithin=0, groupIdSuffix='p')
    drawFloorCard(svgContainer, '_3_3', floorPos=3,cardPosWithin=0, groupIdSuffix='p') 
    drawFloorCard(svgContainer, '_11_3', floorPos=4,cardPosWithin=0, groupIdSuffix='p') 
    drawFloorCard(svgContainer, '_9_4', floorPos=6, cardPosWithin=0,groupIdSuffix='p') 
    
    // collection cards for opponent
    drawCollectionCard(svgContainer, 0, '_11_1', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='p')
    
    drawCollectionCard(svgContainer, 1, '_9_1', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='p')
    drawCollectionCard(svgContainer, 1, '_5_1', cardPosWithin=1, currPlayer=false, piLevel=0, groupIdSuffix='p')

    drawCollectionCard(svgContainer, 2, '_5_2', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='p')
    drawCollectionCard(svgContainer, 2, '_9_2', cardPosWithin=1, currPlayer=false, piLevel=0, groupIdSuffix='p')

    drawCollectionCard(svgContainer, 3, '_11_2', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='p')
    drawCollectionCard(svgContainer, 3, '_5_4', cardPosWithin=1, currPlayer=false, piLevel=0, groupIdSuffix='p')
    drawCollectionCard(svgContainer, 3, '_5_3', cardPosWithin=2, currPlayer=false, piLevel=0, groupIdSuffix='p')


    // collection for current player
    drawCollectionCard(svgContainer, 1, '_7_1', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='p')

    drawCollectionCard(svgContainer, 2, '_2_2', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='p')
    drawCollectionCard(svgContainer, 2, '_6_2', cardPosWithin=1, currPlayer=true, piLevel=0, groupIdSuffix='p')
    drawCollectionCard(svgContainer, 2, '_7_2', cardPosWithin=1, currPlayer=true, piLevel=0, groupIdSuffix='p')

    drawCollectionCard(svgContainer, 3, '_2_3', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='p')
    drawCollectionCard(svgContainer, 3, '_6_3', cardPosWithin=1, currPlayer=true, piLevel=0, groupIdSuffix='p')
    drawCollectionCard(svgContainer, 3, '_7_3', cardPosWithin=2, currPlayer=true, piLevel=0, groupIdSuffix='p')
    drawCollectionCard(svgContainer, 3, '_7_4', cardPosWithin=3, currPlayer=true, piLevel=0, groupIdSuffix='p')

    // curr player hand card
    drawHandCardForCurrPlayer(svgContainer, '_1_1', position=0, groupIdSuffix='p') 
    drawHandCardForCurrPlayer(svgContainer, '_4_1', position=1, groupIdSuffix='p') 
    drawHandCardForCurrPlayer(svgContainer, '_4_2', position=2, groupIdSuffix='p') 
    drawHandCardForCurrPlayer(svgContainer, '_6_1', position=3, groupIdSuffix='p') 
    drawHandCardForCurrPlayer(svgContainer, '_8_3', position=4, groupIdSuffix='p') 
    drawHandCardForCurrPlayer(svgContainer, '_10_1', position=5, groupIdSuffix='p') 
    drawHandCardForCurrPlayer(svgContainer, '_12_3', position=6, groupIdSuffix='p') 

    outlineCardGroup('_1_1', groupIdSuffix='p') 

}

d3.select('#executeBtn').on('click', () => {
    // translate hand card to floor
    let fc1 = getFloorCoordinate(ppukExSvgContainer, floorPos=1, cardPosWithin=1)

    translateG('_1_1', 'p', fc1['f_x'], fc1['f_y'] );
    
    // flip and move cards to collection
    let centerCoord = getCenterCoord(ppukExSvgContainer);
    setTimeout(() => {
        drawCardAsGroup(ppukExSvgContainer, centerCoord['x'], centerCoord['y'], '_1_3', groupId='_1_3gp');
        let fcPos1 = getFloorCoordinate(ppukExSvgContainer, floorPos=1, cardPosWithin=2);

        setTimeout(() => {
            translateG('_1_3', 'p', fcPos1['f_x'] , fcPos1['f_y'] );
                


        }, 1000); 

        
    }, 800);
    
});

// collectong ppuk

let body = d3.select('body');
let collectingPpukExDiv = body.select('#collectingPpukEx');
let collectingPpukExSvgContainer = createSvgElement(body, 'collectingPpukEx');
addAllCardsAsPattern();

drawFloorSections(collectingPpukExSvgContainer, collectingPpukExDiv);
drawCenterRemainingDeck(collectingPpukExSvgContainer, 'cp');
createTtadakExample(collectingPpukExSvgContainer);
function createTtadakExample(svgContainer) {
    // opponent card
    drawHandCardFaceDownSvg(svgContainer, 6)


    // collection cards for opponent
    drawCollectionCard(svgContainer, 1, '_12_2', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='cp')
    drawCollectionCard(svgContainer, 1, '_7_1', cardPosWithin=1, currPlayer=false, piLevel=0, groupIdSuffix='cp')
    drawCollectionCard(svgContainer, 1, '_4_1', cardPosWithin=2, currPlayer=false, piLevel=0, groupIdSuffix='cp')
    
    drawCollectionCard(svgContainer, 2, '_12_3', cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix='cp')
    drawCollectionCard(svgContainer, 2, '_2_2', cardPosWithin=1, currPlayer=false, piLevel=0, groupIdSuffix='cp')
    drawCollectionCard(svgContainer, 2, '_7_2', cardPosWithin=2, currPlayer=false, piLevel=0, groupIdSuffix='cp')
    drawCollectionCard(svgContainer, 2, '_4_2', cardPosWithin=3, currPlayer=false, piLevel=0, groupIdSuffix='cp')
    drawCollectionCard(svgContainer, 2, '_10_2', cardPosWithin=4, currPlayer=false, piLevel=0, groupIdSuffix='cp')

    drawCollectionCard(svgContainer, 3, '_10_3', cardPosWithin=1, currPlayer=false, piLevel=0, groupIdSuffix='cp')
    drawCollectionCard(svgContainer, 3, '_2_4', cardPosWithin=2, currPlayer=false, piLevel=0, groupIdSuffix='cp')


    // collection for current player
    drawCollectionCard(svgContainer, 1, '_9_1', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='cp')    
    drawCollectionCard(svgContainer, 1, '_5_1', cardPosWithin=1, currPlayer=true, piLevel=0, groupIdSuffix='cp')

    drawCollectionCard(svgContainer, 3, '_11_4', cardPosWithin=0, currPlayer=true, piLevel=0, groupIdSuffix='cp')
    drawCollectionCard(svgContainer, 3, '_11_3', cardPosWithin=1, currPlayer=true, piLevel=0, groupIdSuffix='cp')
    drawCollectionCard(svgContainer, 3, '_5_3', cardPosWithin=2, currPlayer=true, piLevel=0, groupIdSuffix='cp')
    drawCollectionCard(svgContainer, 3, '_9_3', cardPosWithin=3, currPlayer=true, piLevel=0, groupIdSuffix='cp')

    // curr player hand card
    drawHandCardForCurrPlayer(svgContainer, '_2_1', position=0, groupIdSuffix='cp') 
    drawHandCardForCurrPlayer(svgContainer, '_3_4', position=1, groupIdSuffix='cp') 
    drawHandCardForCurrPlayer(svgContainer, '_6_1', position=2, groupIdSuffix='cp') 
    drawHandCardForCurrPlayer(svgContainer, '_6_3', position=3, groupIdSuffix='cp') 
    drawHandCardForCurrPlayer(svgContainer, '_7_3', position=4, groupIdSuffix='cp') 
    drawHandCardForCurrPlayer(svgContainer, '_12_1', position=5, groupIdSuffix='cp') 

    // floor cards
    drawFloorCard(svgContainer, '_3_1', floorPos=1,cardPosWithin=0, groupIdSuffix='cp')
    drawFloorCard(svgContainer, '_3_2', floorPos=1,cardPosWithin=1, groupIdSuffix='cp')
    drawFloorCard(svgContainer, '_3_3', floorPos=1,cardPosWithin=2, groupIdSuffix='cp') 
    drawFloorCard(svgContainer, '_1_2', floorPos=3, cardPosWithin=0,groupIdSuffix='cp') 
    drawFloorCard(svgContainer, '_11_2', floorPos=4,cardPosWithin=0, groupIdSuffix='cp') 
    drawFloorCard(svgContainer, '_2_3', floorPos=5,cardPosWithin=0, groupIdSuffix='cp') 
    drawFloorCard(svgContainer, '_8_2', floorPos=6, cardPosWithin=0,groupIdSuffix='cp') 
    
    outlineCardGroup('_3_4', groupIdSuffix='cp') 

}

d3.select('#executeBtn').on('click', () => {
    // translate hand card to floor
    let fc1 = getFloorCoordinate(collectingPpukExSvgContainer, floorPos=1, cardPosWithin=3)

    translateG('_3_4', 'cp', fc1['f_x'], fc1['f_y'] );
    
    // flip and move cards to collection
    let centerCoord = getCenterCoord(collectingPpukExSvgContainer);
    setTimeout(() => {
        drawCardAsGroup(collectingPpukExSvgContainer, centerCoord['x'], centerCoord['y'], '_12_4', groupId='_12_4gcp');
        let fcPos1 = getFloorCoordinate(collectingPpukExSvgContainer, floorPos=8, cardPosWithin=0);

        setTimeout(() => {
            translateG('_12_4', 'cp', fcPos1['f_x'] , fcPos1['f_y']);

            setTimeout(() => {
                let cPos1 = getCollectionCardPos(0, 0, piLevel=0); // 3_1
                let cPos2 = getCollectionCardPos(2, 0, piLevel=0); // 3_2
                let cPos3 = getCollectionCardPos(3, 0, piLevel=1); // 3_3
                let cPos4 = getCollectionCardPos(3, 4, piLevel=0); // 3_4

                translateG('_3_1', 'cp', cPos1['c_x'], cPos1['c_y']);
                translateG('_3_2', 'cp', cPos2['c_x'], cPos2['c_y']);
                translateG('_3_3', 'cp', cPos3['c_x'], cPos3['c_y']);
                translateG('_3_4', 'cp', cPos4['c_x'], cPos4['c_y']);
                outlineCardGroup('_3_4', groupIdSuffix='cp', 'none')

                setTimeout(() => {
                    let extortTo = getCollectionCardPos(3, 1, piLevel=1, currPlayer=true); 
                    translateG('_2_4', 'cp', extortTo['c_x'], extortTo['c_y']);

                }, 600);
            }, 600);


        }, 1000); 

        
    }, 800);

    
});